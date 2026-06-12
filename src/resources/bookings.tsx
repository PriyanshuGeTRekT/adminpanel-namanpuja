import {
  List, Datagrid, TextField, DateField, ReferenceField, EmailField,
  Edit, SimpleForm, SelectInput, TextInput, DateInput,
  SearchInput, ChipField, useRecordContext,
} from 'react-admin';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Chip } from '@mui/material';

export const bookingIcon = EventNoteIcon;

const statusChoices = [
  { id: 'PENDING', name: 'Pending' },
  { id: 'CONFIRMED', name: 'Confirmed' },
  { id: 'COMPLETED', name: 'Completed' },
  { id: 'CANCELLED', name: 'Cancelled' },
];

const statusColor: Record<string, 'default' | 'warning' | 'info' | 'success' | 'error'> = {
  PENDING: 'warning',
  CONFIRMED: 'info',
  COMPLETED: 'success',
  CANCELLED: 'error',
};

const StatusField = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <Chip size="small" label={record.status} color={statusColor[record.status] ?? 'default'} />;
};

const CrmField = () => {
  const record = useRecordContext();
  if (!record) return null;
  return record.crmDealId ? (
    <Chip size="small" label={`CRM #${record.crmDealId}`} color="success" variant="outlined" />
  ) : (
    <Chip size="small" label="Not synced" variant="outlined" />
  );
};

const filters = [
  <SearchInput key="q" source="q" alwaysOn />,
  <SelectInput key="status" source="status" choices={statusChoices} />,
];

export const BookingList = () => (
  <List filters={filters} sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <TextField source="reference" />
      <TextField source="customerName" label="Customer" />
      <EmailField source="customerEmail" label="Email" />
      <TextField source="customerPhone" label="Phone" />
      <ReferenceField source="pujaId" reference="pujas" link={false} emptyText="—">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="cityId" reference="cities" link={false} emptyText="—">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="serviceType" label="Type" />
      <StatusField />
      <CrmField />
      <DateField source="createdAt" showTime />
    </Datagrid>
  </List>
);

export const BookingEdit = () => (
  <Edit>
    <SimpleForm>
      <TextField source="reference" />
      <SelectInput source="status" choices={statusChoices} />
      <TextInput source="customerName" />
      <TextInput source="customerEmail" />
      <TextInput source="customerPhone" />
      <DateInput source="preferredDate" />
      <TextInput source="preferredTime" />
      <TextInput source="addressLine" multiline fullWidth />
      <TextInput source="pincode" />
      <TextInput source="notes" multiline fullWidth minRows={3} />
    </SimpleForm>
  </Edit>
);
