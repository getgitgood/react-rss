import { useAppSelector } from '../../hooks';
import classes from '../../styles/Form.module.scss';

export default function UncontrolFormInfo() {
  const formSubmissions = useAppSelector((state) => state.uncontrolForm);
  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Uncontrolled form submissions</h2>
      <div className={classes.cards_container}>
        {formSubmissions.map((item, i) => (
          <div key={i} className={classes.card}>
            <img src={item.file} className={classes.img} alt="image" />
            <div className={classes.text_content}>
              <p className={classes.title}>
                name:
                <span className={classes.subtitle}>{item.username}</span>
              </p>
              <p className={classes.title}>
                age:
                <span className={classes.subtitle}>{item.age}</span>
              </p>
              <p className={classes.title}>
                email:
                <span className={classes.subtitle}>{item.email}</span>
              </p>
              <p className={classes.title}>
                password:
                <span className={classes.subtitle}>{item.password}</span>
              </p>
              <p className={classes.title}>
                confirmation:
                <span className={classes.subtitle}>{item.confirmPassword}</span>
              </p>
              <p className={classes.title}>
                gender:
                <span className={classes.subtitle}>{item.gender}</span>
              </p>
              <p className={classes.title}>
                country:
                <span className={classes.subtitle}>{item.country}</span>
              </p>
              <p className={classes.title}>
                user agreement:
                <span
                  className={classes.subtitle}
                >{`${item.userAgreement}`}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
