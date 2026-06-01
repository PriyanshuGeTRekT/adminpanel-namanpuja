import {
  List, Datagrid, TextField, BooleanField, NumberField, ReferenceField,
  Edit, Create, TabbedForm, FormTab, TextInput, BooleanInput,
  ReferenceInput, SelectInput, required, SearchInput,
} from 'react-admin';
import ArticleIcon from '@mui/icons-material/Article';
import { JsonInput } from '../components/JsonInput';

export const locationIcon = ArticleIcon;

const filters = [<SearchInput key="q" source="q" alwaysOn />];

export const LocationList = () => (
  <List filters={filters} sort={{ field: 'updatedAt', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <ReferenceField source="pujaId" reference="pujas" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="cityId" reference="cities" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="slug" />
      <NumberField source="views" />
      <BooleanField source="published" />
    </Datagrid>
  </List>
);

const LocationForm = () => (
  <TabbedForm>
    <FormTab label="Page">
      <ReferenceInput source="pujaId" reference="pujas">
        <SelectInput optionText="name" validate={required()} />
      </ReferenceInput>
      <ReferenceInput source="cityId" reference="cities">
        <SelectInput optionText="name" validate={required()} />
      </ReferenceInput>
      <TextInput source="slug" helperText="Auto-generated from puja + city if left blank" fullWidth />
      <TextInput source="h1" label="H1 heading" fullWidth />
      <TextInput source="heroTagline" multiline fullWidth minRows={2} />
      <TextInput source="intro" multiline fullWidth minRows={4} />
      <BooleanInput source="published" defaultValue={true} />
    </FormTab>

    <FormTab label="Content (JSON)">
      <JsonInput source="sections" helperText='[{ "heading": "...", "body": "..." }]' />
      <JsonInput source="benefits" />
      <JsonInput source="rituals" helperText='[{ "name": "...", "description": "..." }]' />
      <JsonInput source="samagri" helperText='[{ "group": "...", "items": ["..."] }]' />
      <JsonInput source="whyChooseUs" helperText='[{ "title": "...", "description": "..." }]' />
      <JsonInput source="occasions" />
      <JsonInput source="serviceAreas" helperText='["Area 1", "Area 2", …]' />
      <JsonInput source="faqs" helperText='[{ "question": "...", "answer": "..." }]' />
      <JsonInput source="cta" helperText='{ "heading": "...", "bullets": ["..."], "body": "...", "buttonLabel": "..." }' />
    </FormTab>

    <FormTab label="SEO">
      <TextInput source="metaTitle" fullWidth />
      <TextInput source="metaDescription" multiline fullWidth minRows={2} />
      <JsonInput source="keywords" helperText='["keyword 1", "keyword 2", …]' />
      <TextInput source="ogImage" label="OG image URL" fullWidth />
      <TextInput source="canonicalUrl" fullWidth />
      <JsonInput source="breadcrumb" helperText='["Home", "India", "UP", "Varanasi", "Satyanarayan Puja"]' />
      <JsonInput source="internalLinks" helperText='[{ "label": "...", "href": "..." }]' />
      <TextInput source="imageAlt" fullWidth />
    </FormTab>
  </TabbedForm>
);

export const LocationEdit = () => <Edit>{<LocationForm />}</Edit>;
export const LocationCreate = () => <Create>{<LocationForm />}</Create>;
