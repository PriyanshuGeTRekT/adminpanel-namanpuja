import { Card, CardContent, Typography, Box } from '@mui/material';
import { Title } from 'react-admin';

const tips = [
  { title: 'Pujas', text: 'Add and manage master pujas — name, deity, price, rituals, samagri and FAQs.' },
  { title: 'Cities & Countries', text: 'Manage the Country → City → Puja flow that customers navigate.' },
  { title: 'Location Pages', text: 'Edit the SEO landing page for every puja × city — content and meta tags.' },
  { title: 'Bookings', text: 'Track incoming bookings; each is mirrored into Atomic CRM as a contact + deal.' },
];

export const Dashboard = () => (
  <Box sx={{ p: 2 }}>
    <Title title="Naman Puja Admin" />
    <Card sx={{ mb: 2, background: 'linear-gradient(135deg,#F97316,#C2410C)', color: '#fff' }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700}>🪔 Naman Puja — Admin Panel</Typography>
        <Typography sx={{ mt: 1, opacity: 0.9 }}>
          Manage pujas, cities, temples, SEO location pages and bookings for namanpuja.com.
        </Typography>
      </CardContent>
    </Card>

    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
      {tips.map((t) => (
        <Card key={t.title}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} color="primary">{t.title}</Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }} color="text.secondary">{t.text}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
);
