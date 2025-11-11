import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MineMap = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSet, setTokenSet] = useState(false);
  const [company, setCompany] = useState<any>(null);
  const [coordinates, setCoordinates] = useState({
    lat: -1.9403,
    lng: 29.8739,
  });

  useEffect(() => {
    if (companyId) {
      fetchCompany();
    }
  }, [companyId]);

  const fetchCompany = async () => {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch company details',
        variant: 'destructive',
      });
    } else {
      setCompany(data);
      if (data.mine_location_lat && data.mine_location_lng) {
        setCoordinates({
          lat: data.mine_location_lat,
          lng: data.mine_location_lng,
        });
      }
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [coordinates.lng, coordinates.lat],
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add marker
    marker.current = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(map.current);

    marker.current.on('dragend', () => {
      const lngLat = marker.current!.getLngLat();
      setCoordinates({
        lat: lngLat.lat,
        lng: lngLat.lng,
      });
    });

    setTokenSet(true);
  };

  const handleSaveLocation = async () => {
    const { error } = await supabase
      .from('companies')
      .update({
        mine_location_lat: coordinates.lat,
        mine_location_lng: coordinates.lng,
      })
      .eq('id', companyId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to save location',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Mine location saved successfully',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/admin/companies')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Companies
          </Button>
        </div>

        {company && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Mine Location: {company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Registration Number: {company.registration_number}
              </p>
              {!tokenSet ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mapbox-token">Mapbox Access Token</Label>
                    <Input
                      id="mapbox-token"
                      type="password"
                      value={mapboxToken}
                      onChange={(e) => setMapboxToken(e.target.value)}
                      placeholder="Enter your Mapbox token"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Get your token at{' '}
                      <a
                        href="https://account.mapbox.com/access-tokens/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        mapbox.com
                      </a>
                    </p>
                  </div>
                  <Button onClick={initializeMap}>Initialize Map</Button>
                </div>
              ) : (
                <>
                  <div className="mb-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>Current Coordinates:</strong>
                    </p>
                    <p className="text-sm">
                      Latitude: {coordinates.lat.toFixed(6)}, Longitude: {coordinates.lng.toFixed(6)}
                    </p>
                  </div>
                  <div
                    ref={mapContainer}
                    className="w-full h-[500px] rounded-lg shadow-lg mb-4"
                  />
                  <Button onClick={handleSaveLocation}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Location
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MineMap;