import { useNavigate } from 'react-router-dom';
import classes from './Details.module.scss';
import { MouseEvent, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { errorMessageMiddleware, removeTags } from '../../utils/helpers';
import { changeClassName } from '../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetGameByIdQuery } from '../../features/api/apiSlice';
import { singleCardUpdated } from '../../features/cards/singleCardSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import ErrorPage from '../../layouts/ErrorPage/ErrorPage';
import { detailsLoadingUpdated } from '../../features/loadings/loadersSlice';

export default function Details() {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.id);
  const { data, isFetching, isError, error } = useGetGameByIdQuery(id);

  useEffect(() => {
    dispatch(detailsLoadingUpdated(isFetching));
    if (data) {
      dispatch(singleCardUpdated(data));
    }
  }, [dispatch, isFetching, data, isError, error]);

  const closeDetails = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      navigate('..');
      setIsOpen(false);
    }
  };

  if (isError && 'status' in error && error.status !== 404) {
    const message = errorMessageMiddleware(error as FetchBaseQueryError);
    return <ErrorPage message={message} />;
  }

  if (isFetching) {
    return (
      <div className={classes.overlay} onClick={closeDetails}>
        <div className={classes.details}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.overlay} onClick={closeDetails}>
      <div className={classes.details}>
        {isOpen && (
          <div className={classes.container} data-testid="details">
            <div
              onClick={closeDetails}
              className={classes.exit_button}
              data-testid="exit_btn"
            />
            <div className={classes.image_container}>
              <img
                className={classes.image}
                src={data?.background_image || '/fallback.png'}
                alt={`${data?.name}_image`}
              />
            </div>
            <div className={classes.text_content}>
              <h2>{data?.name}</h2>
              <h3>Description:</h3>
              <p>
                {data?.description
                  ? removeTags(data?.description)
                  : 'Description not provided'}
              </p>
              <h3>Released: {data?.released || 'No data available'}</h3>
              <div className={`${classes.platforms_wrapper}`}>
                {data?.platforms?.map((platform) => {
                  const currentClassName = changeClassName(
                    platform.platform.slug,
                    classes
                  );

                  return (
                    <div
                      className={currentClassName}
                      data-platform={platform.platform.slug}
                      key={platform.platform.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
