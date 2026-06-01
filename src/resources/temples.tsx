import {
  List, Datagrid, TextField, BooleanField, ReferenceField,
  Edit, Create, TabbedForm, FormTab, TextInput, BooleanInput, NumberInput,
  ReferenceInput, SelectInput, required, SearchInput,
} from 'react-admin';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import { JsonInput } from '../components/JsonInput';

export const templeIcon = TempleHinduIcon;

const filters = [<SearchInput key="q" source="q" alwaysOn />];

export const TempleList = () => (
  <List filters={filters} sort={{ field: 'sortOrder', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="deity" />
      <ReferenceField source="cityId" reference="cities" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <BooleanField source="isFeatured" label="Featured" />
      <BooleanField source="enabled" />
    </Datagrid>
  </List>
);

const TempleForm = () => (
  <TabbedForm>
    <FormTab label="Basics">
      <TextInput source="name" validate={required()} fullWidth />
      <TextInput source="slug" helperText="Auto-generated from name if left blank" fullWidth />
      <TextInput source="deity" />
      <ReferenceInput source="cityId" reference="cities">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="timings" />
      <TextInput source="address" multiline fullWidth />
      <NumberInput source="latitude" />
      <NumberInput source="longitude" />
      <NumberInput source="sortOrder" defaultValue={0} />
      <BooleanInput source="isFeatured" defaultValue={false} />
      <BooleanInput source="enabled" defaultValue={true} />
    </FormTab>

    <FormTab label="Content">
      <TextInput source="shortDesc" label="Short description" multiline fullWidth minRows={2} />
      <TextInput source="description" multiline fullWidth minRows={4} />
      <TextInput source="significance" multiline fullWidth minRows={3} />
      <TextInput source="history" multiline fullWidth minRows={3} />
      <TextInput source="heroImage" label="Hero image URL" fullWidth />
    </FormTab>

    <FormTab label="SEO">
      <TextInput source="metaTitle" fullWidth />
      <TextInput source="metaDescription" multiline fullWidth minRows={2} />
      <JsonInput source="keywords" helperText='["keyword 1", "keyword 2", …]' />
    </FormTab>
  </TabbedForm>
);

export const TempleEdit = () => <Edit>{<TempleForm />}</Edit>;
export const TempleCreate = () => <Create>{<TempleForm />}</Create>;
