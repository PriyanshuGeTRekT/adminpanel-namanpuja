import {
  List, Datagrid, TextField, BooleanField, NumberField,
  Edit, Create, SimpleForm, TextInput, BooleanInput, NumberInput, required,
} from 'react-admin';
import CategoryIcon from '@mui/icons-material/Category';

export const categoryIcon = CategoryIcon;

export const CategoryList = () => (
  <List sort={{ field: 'sortOrder', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="slug" />
      <TextField source="icon" />
      <NumberField source="sortOrder" label="Order" />
      <BooleanField source="enabled" />
    </Datagrid>
  </List>
);

const Form = () => (
  <SimpleForm>
    <TextInput source="name" validate={required()} />
    <TextInput source="slug" helperText="Auto-generated from name if left blank" />
    <TextInput source="description" multiline fullWidth />
    <TextInput source="icon" helperText="lucide icon name, e.g. home, flame, sparkles" />
    <NumberInput source="sortOrder" defaultValue={0} />
    <BooleanInput source="enabled" defaultValue={true} />
  </SimpleForm>
);

export const CategoryEdit = () => <Edit>{<Form />}</Edit>;
export const CategoryCreate = () => <Create>{<Form />}</Create>;
