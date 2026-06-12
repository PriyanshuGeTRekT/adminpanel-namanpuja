import {
  List, Datagrid, TextField, BooleanField, NumberField,
  Edit, Create, SimpleForm, TextInput, BooleanInput, NumberInput, required,
} from 'react-admin';
import PublicIcon from '@mui/icons-material/Public';

export const countryIcon = PublicIcon;

export const CountryList = () => (
  <List sort={{ field: 'sortOrder', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="flagEmoji" label="" />
      <TextField source="name" />
      <TextField source="isoCode" label="ISO" />
      <NumberField source="sortOrder" label="Order" />
      <BooleanField source="enabled" />
    </Datagrid>
  </List>
);

const Form = () => (
  <SimpleForm>
    <TextInput source="name" validate={required()} />
    <TextInput source="slug" helperText="Auto-generated from name if left blank" />
    <TextInput source="isoCode" label="ISO code (e.g. IN)" />
    <TextInput source="flagEmoji" label="Flag emoji" />
    <NumberInput source="sortOrder" defaultValue={0} />
    <BooleanInput source="enabled" defaultValue={true} />
  </SimpleForm>
);

export const CountryEdit = () => <Edit>{<Form />}</Edit>;
export const CountryCreate = () => <Create>{<Form />}</Create>;
