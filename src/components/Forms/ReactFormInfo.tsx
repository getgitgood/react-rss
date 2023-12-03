import { useAppSelector } from '../../hooks';
import classes from '../../styles/Form.module.scss';

export default function ReactFormInfo() {
  const formSubmissions = useAppSelector((state) => state.reactForm);
  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>React form submissions</h2>
      <div className={classes.cards_container}>
        {formSubmissions.map((item, i) => (
          <div key={i} className={classes.card}>
            <img src={item.file} className={classes.img} alt="image" />
            <div className={classes.text_content}>
              <p className={classes.title}>
                Name:
                <span className={classes.subtitle}>{item.name}</span>
              </p>
              <p className={classes.title}>
                Age:
                <span className={classes.subtitle}>{item.age}</span>
              </p>
              <p className={classes.title}>
                Email:
                <span className={classes.subtitle}>{item.email}</span>
              </p>
              <p className={classes.title}>
                Password:
                <span className={classes.subtitle}>{item.password}</span>
              </p>
              <p className={classes.title}>
                Password confirmation:
                <span className={classes.subtitle}>{item.confirmPassword}</span>
              </p>
              <p className={classes.title}>
                Gender:
                <span className={classes.subtitle}>{item.gender}</span>
              </p>
              <p className={classes.title}>
                Country:
                <span className={classes.subtitle}>{item.country}</span>
              </p>
              <p className={classes.title}>
                Agreement:
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
