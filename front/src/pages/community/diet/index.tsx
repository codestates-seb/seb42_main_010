import style from '../../../css/Community/P_Community.module.css';
import Layout from '@/components/MainLayout';
import Categoty from '@/components/Community/Category';
import Searchbar from '@/components/Community/SearchBar';
import Diet from '@/components/Community/EachPost/Diet';

const Community = () => {
  return (
    <Layout>
      <div className={style.Container}>
        <div className={style.Searchbar}>
          <Searchbar />
        </div>
        <div className={style.Category}>
          <Categoty />
        </div>
        <div className={style.Popular}>
          <Diet />
        </div>
      </div>
    </Layout>
  );
};

export default Community;
