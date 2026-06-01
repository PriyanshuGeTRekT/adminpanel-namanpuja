import {
  List, Datagrid, TextField, BooleanField, NumberField, ReferenceField,
  Edit, Create, TabbedForm, FormTab, TextInput, BooleanInput, NumberInput,
  SelectInput, ReferenceInput, required, SearchInput,
} from 'react-admin';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { JsonInput } from '../components/JsonInput';

export const pujaIcon = SelfImprovementIcon;

const serviceTypes = [
  { id: 'EPUJA', name: 'Online e-Puja' },
  { id: 'HOME_VISIT', name: 'Home Visit' },
  { id: 'BOTH', name: 'Home & Online' },
];

const filters = [<SearchInput key="q" source="q" alwaysOn />];

export const PujaList = () => (
  <List filters={filters} sort={{ field: 'sortOrder', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="deity" />
      <ReferenceField source="categoryId" reference="puja-categories" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="serviceType" label="Type" />
      <NumberField source="basePrice" options={{ style: 'currency', currency: 'INR' }} />
      <BooleanField source="isFeatured" label="Featured" />
      <BooleanField source="enabled" />
    </Datagrid>
  </List>
);

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
      <NumberInput source="basePrice" label="Base price (INR)" />
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
