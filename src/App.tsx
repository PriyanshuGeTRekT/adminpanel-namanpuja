import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { namanTheme } from './theme';
import { Dashboard } from './Dashboard';

import { CountryList, CountryEdit, CountryCreate, countryIcon } from './resources/countries';
import { CityList, CityEdit, CityCreate, cityIcon } from './resources/cities';
import { CategoryList, CategoryEdit, CategoryCreate, categoryIcon } from './resources/pujaCategories';
import { PujaList, PujaEdit, PujaCreate, pujaIcon } from './resources/pujas';
import { LocationList, LocationEdit, LocationCreate, locationIcon } from './resources/pujaLocations';
import { TempleList, TempleEdit, TempleCreate, templeIcon } from './resources/temples';
import { BookingList, BookingEdit, bookingIcon } from './resources/bookings';

export default function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      theme={namanTheme}
      dashboard={Dashboard}
      title="Naman Puja Admin"
      requireAuth
    >
      <Resource
        name="pujas"
        list={PujaList}
        edit={PujaEdit}
        create={PujaCreate}
        icon={pujaIcon}
        options={{ label: 'Pujas' }}
      />
      <Resource
        name="puja-locations"
        list={LocationList}
        edit={LocationEdit}
        create={LocationCreate}
        icon={locationIcon}
        options={{ label: 'Location Pages' }}
      />
      <Resource
        name="bookings"
        list={BookingList}
        edit={BookingEdit}
        icon={bookingIcon}
        options={{ label: 'Bookings' }}
      />
      <Resource
        name="temples"
        list={TempleList}
        edit={TempleEdit}
        create={TempleCreate}
        icon={templeIcon}
        options={{ label: 'Temples' }}
      />
      <Resource
        name="cities"
        list={CityList}
        edit={CityEdit}
        create={CityCreate}
        icon={cityIcon}
        options={{ label: 'Cities' }}
      />
      <Resource
        name="countries"
        list={CountryList}
        edit={CountryEdit}
        create={CountryCreate}
        icon={countryIcon}
        options={{ label: 'Countries' }}
      />
      <Resource
        name="puja-categories"
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate}
        icon={categoryIcon}
        options={{ label: 'Categories' }}
      />
    </Admin>
  );
}
