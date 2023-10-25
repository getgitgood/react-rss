import './index.scss';
import './components/SearchForm';
import SearchForm from './components/SearchForm';
import PageHeading from './components/PageHeading';

export default function App() {
  return (
    <div>
      <PageHeading />
      <SearchForm />
    </div>
  );
}
