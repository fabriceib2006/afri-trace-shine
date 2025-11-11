import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { Trash2, Mail } from 'lucide-react';
interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}
const CitizenManagement = () => {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    user,
    userRole,
    loading
  } = useAuth();
  const {
    toast
  } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  useEffect(() => {
    if (!loading && (!user || userRole !== 'administrator')) {
      navigate('/auth');
    }
  }, [user, userRole, loading, navigate]);
  useEffect(() => {
    if (user && userRole === 'administrator') {
      fetchProfiles();
    }
  }, [user, userRole]);
  const fetchProfiles = async () => {
    const {
      data,
      error
    } = await supabase.from('profiles').select('*').order('created_at', {
      ascending: false
    });
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch citizens',
        variant: 'destructive'
      });
    } else {
      setProfiles(data || []);
    }
  };
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this citizen? This action cannot be undone.')) return;
    const {
      error
    } = await supabase.from('profiles').delete().eq('id', id);
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete citizen',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Citizen deleted successfully'
      });
      fetchProfiles();
    }
  };
  if (loading || !user || userRole !== 'administrator') {
    return null;
  }
  return <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold py-0 my-[40px]">{t('adminPanel.manageCitizens')}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('adminPanel.citizens')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('auth.fullName')}</TableHead>
                  <TableHead>{t('auth.email')}</TableHead>
                  <TableHead>Registered Date</TableHead>
                  <TableHead>{t('adminPanel.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map(profile => <TableRow key={profile.id}>
                    <TableCell className="font-medium">
                      {profile.full_name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {profile.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(profile.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(profile.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('adminPanel.delete')}
                      </Button>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>;
};
export default CitizenManagement;