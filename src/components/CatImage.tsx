import happy_cat from 'src/assets/img/happy_cat.gif';
import sad_cat from 'src/assets/img/sad_cat.gif';

type CatImageProps = {
  isAuth: boolean;
};

const CatImage = ({ isAuth }: CatImageProps) => {
  return (
    <>
      <div className="h-80 w-80">
        {isAuth ? (
          <img className="object-contain" src={happy_cat} alt="happy_cat" />
        ) : (
          <img src={sad_cat} className="object-contain" alt="sad_cat" />
        )}
      </div>
    </>
  );
};

export default CatImage;
