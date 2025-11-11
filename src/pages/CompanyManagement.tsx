import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
interface Company {
  id: string;
  name: string;
  registration_number: string;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  mine_location_lat: number | null;
  mine_location_lng: number | null;
  certification_status: string;
  certification_start_date: string;
  certification_end_date: string;
  regional_compliance: any;
  is_active: boolean;
}
const CompanyManagement = () => {
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
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    registration_number: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    mine_location_lat: '',
    mine_location_lng: '',
    certification_status: 'active',
    certification_start_date: '',
    certification_end_date: ''
  });
  useEffect(() => {
    if (!loading && (!user || userRole !== 'administrator')) {
      navigate('/auth');
    }
  }, [user, userRole, loading, navigate]);
  useEffect(() => {
    if (user && userRole === 'administrator') {
      fetchCompanies();
    }
  }, [user, userRole]);
  const fetchCompanies = async () => {
    const {
      data,
      error
    } = await supabase.from('companies').select('*').order('created_at', {
      ascending: false
    });
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch companies',
        variant: 'destructive'
      });
    } else {
      setCompanies(data || []);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const companyData = {
      ...formData,
      mine_location_lat: formData.mine_location_lat ? parseFloat(formData.mine_location_lat) : null,
      mine_location_lng: formData.mine_location_lng ? parseFloat(formData.mine_location_lng) : null
    };
    if (editingCompany) {
      const {
        error
      } = await supabase.from('companies').update(companyData).eq('id', editingCompany.id);
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update company',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: 'Company updated successfully'
        });
        fetchCompanies();
        resetForm();
      }
    } else {
      const {
        error
      } = await supabase.from('companies').insert([companyData]);
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to add company',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Success',
          description: 'Company added successfully'
        });
        fetchCompanies();
        resetForm();
      }
    }
  };
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this company?')) return;
    const {
      error
    } = await supabase.from('companies').delete().eq('id', id);
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete company',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Company deleted successfully'
      });
      fetchCompanies();
    }
  };
  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      registration_number: company.registration_number,
      contact_email: company.contact_email || '',
      contact_phone: company.contact_phone || '',
      address: company.address || '',
      mine_location_lat: company.mine_location_lat?.toString() || '',
      mine_location_lng: company.mine_location_lng?.toString() || '',
      certification_status: company.certification_status,
      certification_start_date: company.certification_start_date,
      certification_end_date: company.certification_end_date
    });
    setIsDialogOpen(true);
  };
  const resetForm = () => {
    setFormData({
      name: '',
      registration_number: '',
      contact_email: '',
      contact_phone: '',
      address: '',
      mine_location_lat: '',
      mine_location_lng: '',
      certification_status: 'active',
      certification_start_date: '',
      certification_end_date: ''
    });
    setEditingCompany(null);
    setIsDialogOpen(false);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'expired':
        return 'bg-red-500';
      case 'suspended':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  if (loading || !user || userRole !== 'administrator') {
    return null;
  }
  return <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 my-[40px]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('adminPanel.manageCompanies')}</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                {t('adminPanel.addCompany')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCompany ? t('adminPanel.edit') : t('adminPanel.addCompany')}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t('adminPanel.companyName')}</Label>
                    <Input id="name" value={formData.name} onChange={e => setFormData({
                    ...formData,
                    name: e.target.value
                  })} required />
                  </div>
                  <div>
                    <Label htmlFor="registration_number">{t('adminPanel.registrationNumber')}</Label>
                    <Input id="registration_number" value={formData.registration_number} onChange={e => setFormData({
                    ...formData,
                    registration_number: e.target.value
                  })} required />
                  </div>
                  <div>
                    <Label htmlFor="contact_email">{t('adminPanel.email')}</Label>
                    <Input id="contact_email" type="email" value={formData.contact_email} onChange={e => setFormData({
                    ...formData,
                    contact_email: e.target.value
                  })} />
                  </div>
                  <div>
                    <Label htmlFor="contact_phone">{t('adminPanel.phone')}</Label>
                    <Input id="contact_phone" value={formData.contact_phone} onChange={e => setFormData({
                    ...formData,
                    contact_phone: e.target.value
                  })} />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">{t('adminPanel.address')}</Label>
                    <Input id="address" value={formData.address} onChange={e => setFormData({
                    ...formData,
                    address: e.target.value
                  })} />
                  </div>
                  <div>
                    <Label htmlFor="mine_location_lat">Latitude</Label>
                    <Input id="mine_location_lat" type="number" step="any" value={formData.mine_location_lat} onChange={e => setFormData({
                    ...formData,
                    mine_location_lat: e.target.value
                  })} />
                  </div>
                  <div>
                    <Label htmlFor="mine_location_lng">Longitude</Label>
                    <Input id="mine_location_lng" type="number" step="any" value={formData.mine_location_lng} onChange={e => setFormData({
                    ...formData,
                    mine_location_lng: e.target.value
                  })} />
                  </div>
                  <div>
                    <Label htmlFor="certification_status">{t('adminPanel.certificationStatus')}</Label>
                    <Select value={formData.certification_status} onValueChange={value => setFormData({
                    ...formData,
                    certification_status: value
                  })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">{t('adminPanel.active')}</SelectItem>
                        <SelectItem value="expired">{t('adminPanel.expired')}</SelectItem>
                        <SelectItem value="suspended">{t('adminPanel.suspended')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="certification_start_date">{t('adminPanel.startDate')}</Label>
                    <Input id="certification_start_date" type="date" value={formData.certification_start_date} onChange={e => setFormData({
                    ...formData,
                    certification_start_date: e.target.value
                  })} required />
                  </div>
                  <div>
                    <Label htmlFor="certification_end_date">{t('adminPanel.endDate')}</Label>
                    <Input id="certification_end_date" type="date" value={formData.certification_end_date} onChange={e => setFormData({
                    ...formData,
                    certification_end_date: e.target.value
                  })} required />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    {t('adminPanel.cancel')}
                  </Button>
                  <Button type="submit">{t('adminPanel.save')}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('adminPanel.companies')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('adminPanel.companyName')}</TableHead>
                  <TableHead>{t('adminPanel.registrationNumber')}</TableHead>
                  <TableHead>{t('adminPanel.certificationStatus')}</TableHead>
                  <TableHead>{t('adminPanel.startDate')}</TableHead>
                  <TableHead>{t('adminPanel.endDate')}</TableHead>
                  <TableHead>{t('adminPanel.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map(company => <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.registration_number}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(company.certification_status)}>
                        {company.certification_status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(company.certification_start_date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(company.certification_end_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(company)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {company.mine_location_lat && company.mine_location_lng && <Button variant="outline" size="sm" onClick={() => navigate(`/map/${company.id}`)}>
                            <MapPin className="h-4 w-4" />
                          </Button>}
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(company.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
export default CompanyManagement;