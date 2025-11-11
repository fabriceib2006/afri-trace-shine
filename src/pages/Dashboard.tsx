import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { user, userRole, loading } = useAuth();
  const [feedbackReports, setFeedbackReports] = useState<FeedbackReport[]>([]);
  const [fetchingReports, setFetchingReports] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && userRole) {
      fetchFeedbackReports();
    }
  }, [user, userRole]);

  const fetchFeedbackReports = async () => {
    let query = supabase
      .from('feedback_reports')
      .select('*')
      .order('created_at', { ascending: false });

    // Citizens can only see their own reports
    if (userRole !== 'administrator') {
      query = query.eq('user_id', user?.id);
    }

    const { data, error } = await query;

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
      <main className="container mx-auto px-4 py-20 sm:py-24">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground">
            {userRole === 'administrator' ? t('Admin Dashboard') : t('Citizen Dashboard')}
          </p>
        </div>

        {userRole === 'administrator' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('Admin Access')}</CardTitle>
              <CardDescription>{t('Admin Access Desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/admin')}>
                {t('Go To Admin Dashboard')}
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.myReports')}</CardTitle>
            <CardDescription>{t('Track Reports')}</CardDescription>
          </CardHeader>
          <CardContent>
            {fetchingReports ? (
              <p>{t('dashboard.loadingReports')}</p>
            ) : feedbackReports.length === 0 ? (
              <p className="text-muted-foreground">{t('dashboard.noReports')}</p>
            ) : (
              <div className="space-y-4">
                {feedbackReports.map((report) => (
                  <Card key={report.id}>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-base sm:text-lg">{report.title}</CardTitle>
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
                          {t('dashboard.reportLocation')}: {report.location}
                        </p>
                      )}
                      {report.admin_response && (
                        <div className="mt-4 p-3 bg-muted rounded">
                          <p className="text-sm font-semibold mb-1">{t('dashboard.adminResponse')}:</p>
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
