import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';

interface FeedbackReport {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  status: string;
  admin_response: string | null;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const [feedbackReports, setFeedbackReports] = useState<FeedbackReport[]>([]);
  const [fetchingReports, setFetchingReports] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchFeedbackReports();
    }
  }, [user]);

  const fetchFeedbackReports = async () => {
    const { data, error } = await supabase
      .from('feedback_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setFeedbackReports(data);
    }
    setFetchingReports(false);
  };

  if (loading || !user) {
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
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">
            {userRole === 'administrator' ? 'Admin Dashboard' : 'Citizen Dashboard'}
          </p>
        </div>

        {userRole === 'administrator' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Administrator Access</CardTitle>
              <CardDescription>You have full access to manage feedback and system data</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/admin')}>
                Go to Admin Panel
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>My Feedback Reports</CardTitle>
            <CardDescription>Track the status of your submitted reports</CardDescription>
          </CardHeader>
          <CardContent>
            {fetchingReports ? (
              <p>Loading reports...</p>
            ) : feedbackReports.length === 0 ? (
              <p className="text-muted-foreground">You haven't submitted any reports yet.</p>
            ) : (
              <div className="space-y-4">
                {feedbackReports.map((report) => (
                  <Card key={report.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                          <CardDescription>
                            {new Date(report.created_at).toLocaleDateString()} • {report.category}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">{report.description}</p>
                      {report.location && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Location: {report.location}
                        </p>
                      )}
                      {report.admin_response && (
                        <div className="mt-4 p-3 bg-muted rounded">
                          <p className="text-sm font-semibold mb-1">Admin Response:</p>
                          <p className="text-sm">{report.admin_response}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
