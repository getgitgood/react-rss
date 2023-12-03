import { useAppSelector } from '../../hooks';
import classes from '../../styles/FormInfo.module.scss';

export default function UncontrolFormInfo() {
  const formSubmissions = useAppSelector((state) => state.uncontrolForm);
  return (
    <div>
      <h2 className={classes.void}>Uncontrol</h2>
      <div>
        {formSubmissions.map((item, i) => (
          <div key={i}>
            <p>name: {item.username}</p>
            <p>age: {item.age}</p>
            <p>email: {item.email}</p>
            <p>password: {item.password}</p>
            <p>password confirmation: {item.confirmPassword}</p>
            <p>gender: {item.gender}</p>
            <p>country: {item.country}</p>
            <p>user agreement: {`${item.userAgreement}`}</p>
            <div>
              file:
              <img src={item.file} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
