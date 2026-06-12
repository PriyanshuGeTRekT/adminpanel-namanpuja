// import {
//   List, Datagrid, TextField, BooleanField, NumberField, ReferenceField,
//   Edit, Create, TabbedForm, FormTab, TextInput, BooleanInput, NumberInput,
//   SelectInput, ReferenceInput, required, SearchInput,
// } from 'react-admin';
// import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
// import { JsonInput } from '../components/JsonInput';

// export const pujaIcon = SelfImprovementIcon;

// const serviceTypes = [
//   { id: 'EPUJA', name: 'Online e-Puja' },
//   { id: 'HOME_VISIT', name: 'Home Visit' },
//   { id: 'BOTH', name: 'Home & Online' },
// ];

// const filters = [<SearchInput key="q" source="q" alwaysOn />];

// export const PujaList = () => (
//   <List filters={filters} sort={{ field: 'sortOrder', order: 'ASC' }}>
//     <Datagrid rowClick="edit">
//       <TextField source="name" />
//       <TextField source="deity" />
//       <ReferenceField source="categoryId" reference="puja-categories" link={false}>
//         <TextField source="name" />
//       </ReferenceField>
//       <TextField source="serviceType" label="Type" />
//       <NumberField source="basePrice" options={{ style: 'currency', currency: 'INR' }} />
//       <BooleanField source="isFeatured" label="Featured" />
//       <BooleanField source="enabled" />
//     </Datagrid>
//   </List>
// );

// const PujaForm = () => (
//   <TabbedForm>
//     <FormTab label="Basics">
//       <TextInput source="name" validate={required()} fullWidth />
//       <TextInput source="slug" helperText="Auto-generated from name if left blank" fullWidth />
//       <TextInput source="subtitle" fullWidth />
//       <TextInput source="deity" />
//       <ReferenceInput source="categoryId" reference="puja-categories">
//         <SelectInput optionText="name" />
//       </ReferenceInput>
//       <SelectInput source="serviceType" choices={serviceTypes} defaultValue="BOTH" validate={required()} />
//       <NumberInput source="durationMin" label="Duration (minutes)" />
//       <NumberInput source="basePrice" label="Base price (INR)" />
//       <NumberInput source="sortOrder" defaultValue={0} />
//       <BooleanInput source="isFeatured" defaultValue={false} />
//       <BooleanInput source="enabled" defaultValue={true} />
//     </FormTab>

//     <FormTab label="Description">
//       <TextInput source="shortDesc" label="Short description" multiline fullWidth minRows={2} />
//       <TextInput source="description" multiline fullWidth minRows={5} />
//       <TextInput source="heroImage" label="Hero image URL" fullWidth />
//     </FormTab>

//     <FormTab label="Content (JSON)">
//       <JsonInput source="benefits" helperText='Array of strings, e.g. ["Attract positive energy", …]' />
//       <JsonInput source="rituals" helperText='[{ "name": "...", "description": "..." }]' />
//       <JsonInput source="samagri" helperText='[{ "group": "...", "items": ["..."] }]' />
//       <JsonInput source="occasions" helperText='["Housewarming", "Birthdays", …]' />
//       <JsonInput source="faqs" helperText='[{ "question": "...", "answer": "..." }]' />
//     </FormTab>
//   </TabbedForm>
// );

// export const PujaEdit = () => <Edit>{<PujaForm />}</Edit>;
// export const PujaCreate = () => <Create>{<PujaForm />}</Create>;


import { useState } from 'react';
import {
  List, Datagrid, TextField, BooleanField, ReferenceField,
  Edit, Create, TabbedForm, FormTab, TextInput, BooleanInput, NumberInput,
  SelectInput, ReferenceInput, required, SearchInput,
  useRecordContext,
} from 'react-admin';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PreviewIcon from '@mui/icons-material/Preview';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import MuiTextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { JsonInput } from '../components/JsonInput';

export const pujaIcon = SelfImprovementIcon;

const ORANGE = '#E67A2E';

const serviceTypes = [
  { id: 'EPUJA', name: 'Online e-Puja' },
  { id: 'HOME_VISIT', name: 'Home Visit' },
  { id: 'BOTH', name: 'Home & Online' },
];

const filters = [<SearchInput key="q" source="q" alwaysOn />];

// ─── Booking Form Modal (inline, no separate file needed) ─────────────────────
const BookingFormModal = ({
  open,
  onClose,
  pujaName,
}: {
  open: boolean;
  onClose: () => void;
  pujaName?: string;
}) => {
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [request, setRequest] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const reset = () => {
    setWhatsapp(''); setEmail(''); setDate('');
    setRequest(''); setAgreed(false);
    setErrors({}); setSubmitting(false); setSuccessMsg('');
  };

  const handleClose = () => { reset(); onClose(); };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!/^\d{10,15}$/.test(whatsapp.trim()))
      errs.whatsapp = 'Valid WhatsApp number (10-15 digits) required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = 'Valid email address required';
    if (!date) errs.date = 'Please pick a date';
    if (!agreed) errs.agreed = 'You must accept the Terms & Conditions';
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    try {
      setSuccessMsg(
        `✅ Booking confirmed${pujaName ? ` for ${pujaName}` : ''} on ${date}`
      );
      setTimeout(handleClose, 1800);
    } catch {
      setErrors({ form: 'Could not submit booking. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth
      PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}>

      {/* Header */}
      <Box sx={{
        background: `linear-gradient(135deg, ${ORANGE} 0%, #F5A046 100%)`,
        px: 3, py: 2.5, color: '#fff', textAlign: 'center', position: 'relative',
      }}>
        <IconButton onClick={handleClose} size="small" sx={{
          position: 'absolute', right: 10, top: 10, color: '#fff',
          bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' },
        }}>
          <CloseIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" fontWeight={700}>Namaste 🙏 नमस्ते</Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Secure your visit • अपनी यात्रा सुरक्षित करें
        </Typography>
        {pujaName && (
          <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 600 }}>{pujaName}</Typography>
        )}
      </Box>

      {/* Body */}
      <DialogContent sx={{ pt: 3, pb: 1 }}>
        {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}
        {errors.form && <Alert severity="error" sx={{ mb: 2 }}>{errors.form}</Alert>}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <MuiTextField
            label="WhatsApp Number / व्हाट्सएप नंबर" required
            inputProps={{ inputMode: 'tel', maxLength: 15 }}
            placeholder="91XXXXXXXXXX"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ''))}
            error={!!errors.whatsapp} helperText={errors.whatsapp}
            size="small" fullWidth
          />
          <MuiTextField
            label="Email / ईमेल" required type="email"
            placeholder="your@email.com"
            value={email} onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email} helperText={errors.email}
            size="small" fullWidth
          />
          <MuiTextField
            label="Preferred Date / तिथि चुनें" required type="date"
            value={date} onChange={(e) => setDate(e.target.value)}
            inputProps={{ min: today }}
            error={!!errors.date} helperText={errors.date}
            size="small" fullWidth InputLabelProps={{ shrink: true }}
            InputProps={{ startAdornment: <CalendarMonthIcon sx={{ mr: 1, color: ORANGE, fontSize: 18 }} /> }}
          />
          <MuiTextField
            label="Special Request / विशेष अनुरोध"
            placeholder="Any specific requirements?"
            value={request} onChange={(e) => setRequest(e.target.value)}
            multiline minRows={3} inputProps={{ maxLength: 1000 }}
            size="small" fullWidth
          />
          <Box>
            <FormControlLabel
              control={
                <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                  sx={{ color: ORANGE, '&.Mui-checked': { color: ORANGE } }} />
              }
              label={
                <Typography variant="caption" color="text.secondary">
                  I agree to the{' '}
                  <Typography component="span" variant="caption" sx={{ color: ORANGE, fontWeight: 600 }}>
                    Terms &amp; Conditions
                  </Typography>{' '}and{' '}
                  <Typography component="span" variant="caption" sx={{ color: ORANGE, fontWeight: 600 }}>
                    Privacy Policy
                  </Typography>.
                </Typography>
              }
            />
            {errors.agreed && (
              <Typography variant="caption" color="error" display="block" ml={1.5}>
                {errors.agreed}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button fullWidth variant="contained" disabled={submitting} onClick={handleSubmit}
          sx={{
            background: `linear-gradient(135deg, ${ORANGE} 0%, #F5A046 50%, #F5C063 100%)`,
            color: '#fff', fontWeight: 700, fontSize: 15, py: 1.3,
            borderRadius: 2, textTransform: 'none', boxShadow: 3,
            '&:hover': { opacity: 0.93, boxShadow: 5 },
          }}>
          {submitting ? 'Submitting…' : 'Confirm Booking / बुकिंग की पुष्टि'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─── Booking Preview Button (shown in each Datagrid row) ──────────────────────
const BookingPreviewButton = () => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);
  if (!record) return null;
  return (
    <>
      <Button size="small" variant="outlined" startIcon={<PreviewIcon />}
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        sx={{
          borderColor: ORANGE, color: ORANGE, textTransform: 'none',
          '&:hover': { background: '#E67A2E14', borderColor: ORANGE },
        }}>
        Booking Form
      </Button>
      <BookingFormModal open={open} onClose={() => setOpen(false)} pujaName={record.name} />
    </>
  );
};

// ─── List (basePrice removed) ─────────────────────────────────────────────────
export const PujaList = () => (
  <List filters={filters} sort={{ field: 'sortOrder', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="deity" />
      <ReferenceField source="categoryId" reference="puja-categories" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="serviceType" label="Type" />
      <BooleanField source="isFeatured" label="Featured" />
      <BooleanField source="enabled" />
      <BookingPreviewButton />
    </Datagrid>
  </List>
);

// ─── Form (basePrice field removed) ──────────────────────────────────────────
const PujaForm = () => (
  <TabbedForm>
    <FormTab label="Basics">
      <TextInput source="name" validate={required()} fullWidth />
      <TextInput source="slug" helperText="Auto-generated from name if left blank" fullWidth />
      <TextInput source="subtitle" fullWidth />
      <TextInput source="deity" />
      <ReferenceInput source="categoryId" reference="puja-categories">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <SelectInput source="serviceType" choices={serviceTypes} defaultValue="BOTH" validate={required()} />
      <NumberInput source="durationMin" label="Duration (minutes)" />
      <NumberInput source="sortOrder" defaultValue={0} />
      <BooleanInput source="isFeatured" defaultValue={false} />
      <BooleanInput source="enabled" defaultValue={true} />
    </FormTab>

    <FormTab label="Description">
      <TextInput source="shortDesc" label="Short description" multiline fullWidth minRows={2} />
      <TextInput source="description" multiline fullWidth minRows={5} />
      <TextInput source="heroImage" label="Hero image URL" fullWidth />
    </FormTab>

    <FormTab label="Content (JSON)">
      <JsonInput source="benefits" helperText='Array of strings, e.g. ["Attract positive energy", …]' />
      <JsonInput source="rituals" helperText='[{ "name": "...", "description": "..." }]' />
      <JsonInput source="samagri" helperText='[{ "group": "...", "items": ["..."] }]' />
      <JsonInput source="occasions" helperText='["Housewarming", "Birthdays", …]' />
      <JsonInput source="faqs" helperText='[{ "question": "...", "answer": "..." }]' />
    </FormTab>
  </TabbedForm>
);

export const PujaEdit = () => <Edit>{<PujaForm />}</Edit>;
export const PujaCreate = () => <Create>{<PujaForm />}</Create>;
