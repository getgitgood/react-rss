import {
  Await,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
  useNavigate
} from 'react-router-dom';

import { makeDetailsRequest } from '../../api/apiClient';
import classes from './Details.module.scss';
import { DeferData, DetailsItem } from '../../types';
import { MouseEvent, Suspense } from 'react';
import Loader from '../Loader/Loader';
import { removeTags } from '../../utils/helpers';
import platformsSlugData from '../../utils/platformsSlugData';

export async function detailsLoader({ params }: LoaderFunctionArgs) {
  const cardId = params.cardId;
  return defer({
    data: makeDetailsRequest(cardId)
  });
}

export function Details() {
  const deferData = useLoaderData() as DeferData<DetailsItem>;
  const data = deferData.data;

  const navigate = useNavigate();

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      navigate('..');
    }
  };

  const changeClassName = (slug: string, classes: Record<string, string>) => {
    const platformsSlug = platformsSlugData;
    const currentClassName = platformsSlug[slug];
    console.log(platformsSlug);
    return `${classes.platform_logo} ${currentClassName}`;
  };

  return (
    <div className={classes.overlay} onClick={clickHandler}>
      <div className={classes.details}>
        <Suspense fallback={<Loader />}>
          <Await resolve={data}>
            {(resolvedData: DetailsItem) => {
              return (
                <div className={classes.container}>
                  <div onClick={clickHandler} className={classes.exit_button} />
                  <div className={classes.image_container}>
                    <img
                      className={classes.image}
                      src={resolvedData.background_image || '/fallback.png'}
                      alt={`${resolvedData.name}_image`}
                    />
                  </div>
                  <div className={classes.text_content}>
                    <h2>{resolvedData.name}</h2>
                    <h3>Description:</h3>
                    <p>
                      {removeTags(resolvedData.description) ||
                        'Description not provided'}
                    </p>
                    <h3>
                      Released: {resolvedData.released || 'No data availiable'}
                    </h3>
                    <div className={`${classes.platforms_wrapper}`}>
                      {resolvedData.platforms &&
                        resolvedData.platforms.map((platform) => {
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
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
