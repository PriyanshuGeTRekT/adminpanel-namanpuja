import {
  List, Datagrid, TextField, BooleanField, ReferenceField,
  Edit, Create, SimpleForm, TextInput, BooleanInput, NumberInput,
  ReferenceInput, SelectInput, required, SearchInput,
} from 'react-admin';
import LocationCityIcon from '@mui/icons-material/LocationCity';

export const cityIcon = LocationCityIcon;

const filters = [<SearchInput key="q" source="q" alwaysOn />];

export const CityList = () => (
  <List filters={filters} sort={{ field: 'sortOrder', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="state" />
      <ReferenceField source="countryId" reference="countries" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <BooleanField source="isPopular" label="Popular" />
      <BooleanField source="enabled" />
    </Datagrid>
  </List>
);

const Form = () => (
  <SimpleForm>
    <ReferenceInput source="countryId" reference="countries">
      <SelectInput optionText="name" validate={required()} />
    </ReferenceInput>
    <TextInput source="name" validate={required()} />
    <TextInput source="slug" helperText="Auto-generated from name if left blank" />
    <TextInput source="state" />
    <TextInput source="geoRegion" label="Geo region (e.g. IN-UP)" />
    <NumberInput source="latitude" />
    <NumberInput source="longitude" />
    <NumberInput source="sortOrder" defaultValue={0} />
    <BooleanInput source="isPopular" defaultValue={false} />
    <BooleanInput source="enabled" defaultValue={true} />
  </SimpleForm>
);

export const CityEdit = () => <Edit>{<Form />}</Edit>;
export const CityCreate = () => <Create>{<Form />}</Create>;
