import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Profile {
  full_name: string;
  email: string;
}

interface FeedbackReport {
  id: string;
  user_id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  status: string;
  admin_response: string | null;
  created_at: string;
  profiles: Profile | null;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const [feedbackReports, setFeedbackReports] = useState<FeedbackReport[]>([]);
  const [fetchingReports, setFetchingReports] = useState(true);
  const [selectedReport, setSelectedReport] = useState<FeedbackReport | null>(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth');
      } else if (userRole !== 'administrator') {
        navigate('/dashboard');
        toast.error('Access denied. Administrators only.');
      }
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    if (user && userRole === 'administrator') {
      fetchAllFeedback();
    }
  }, [user, userRole]);

  const fetchAllFeedback = async () => {
    const { data, error } = await supabase
      .from('feedback_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Fetch profiles separately
      const reportsWithProfiles = await Promise.all(
        data.map(async (report) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', report.user_id)
            .single();
          
          return {
            ...report,
            profiles: profile
          };
        })
      );
      setFeedbackReports(reportsWithProfiles);
    }
    setFetchingReports(false);
  };

  const handleUpdateReport = async () => {
    if (!selectedReport) return;

    const { error } = await supabase
      .from('feedback_reports')
      .update({
        status: newStatus || selectedReport.status,
        admin_response: adminResponse,
        admin_id: user?.id
      })
      .eq('id', selectedReport.id);

    if (error) {
      toast.error('Failed to update report');
    } else {
      toast.success('Report updated successfully');
      setSelectedReport(null);
      setAdminResponse('');
      setNewStatus('');
      fetchAllFeedback();
    }
  };

  if (loading || !user || userRole !== 'administrator') {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'reviewed': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage citizen feedback and system data
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>All Feedback Reports</CardTitle>
              <CardDescription>Review and respond to citizen feedback</CardDescription>
            </CardHeader>
            <CardContent>
              {fetchingReports ? (
                <p>Loading reports...</p>
              ) : feedbackReports.length === 0 ? (
                <p className="text-muted-foreground">No reports submitted yet.</p>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {feedbackReports.map((report) => (
                    <Card 
                      key={report.id} 
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => {
                        setSelectedReport(report);
                        setAdminResponse(report.admin_response || '');
                        setNewStatus(report.status);
                      }}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{report.title}</CardTitle>
                            <CardDescription>
                              {report.profiles?.full_name} • {report.category}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
              <CardDescription>
                {selectedReport ? 'Review and respond' : 'Select a report to view details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedReport ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">{selectedReport.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Submitted by: {selectedReport.profiles?.full_name} ({selectedReport.profiles?.email})
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Date: {new Date(selectedReport.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Category: {selectedReport.category}
                    </p>
                    {selectedReport.location && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Location: {selectedReport.location}
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Description:</h4>
                    <p className="text-sm">{selectedReport.description}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Update Status:</label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Admin Response:</label>
                    <Textarea
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                      placeholder="Enter your response to the citizen..."
                      rows={5}
                    />
                  </div>

                  <Button onClick={handleUpdateReport} className="w-full">
                    Update Report
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Select a report from the list to view details and respond
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
