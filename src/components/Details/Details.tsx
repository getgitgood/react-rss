import { useNavigate, useParams } from 'react-router-dom';

import { makeDetailsRequest } from '../../api/apiClient';
import classes from './Details.module.scss';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { removeTags } from '../../utils/helpers';
import platformsSlugData from '../../utils/platformsSlugData';
import { AppContext } from '../Context/Context';

export default function Details() {
  const { itemData, setItemData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const { cardId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const itemLoader = async () => {
      try {
        setIsLoading(true);
        const itemData = await makeDetailsRequest(cardId);
        setIsLoading(false);
        setItemData(itemData);
      } catch (e) {
        setIsLoading(false);
        throw e;
      }
    };
    itemLoader();
  }, [cardId, setItemData]);

  const closeDetails = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      navigate('..');
    }
  };

  const changeClassName = (slug: string, classes: Record<string, string>) => {
    const platformsSlug = platformsSlugData;
    const currentClassName = platformsSlug[slug];

    return `${classes.platform_logo} ${currentClassName}`;
  };

  return (
    <div className={classes.overlay} onClick={closeDetails}>
      <div className={classes.details}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={classes.container} data-testid="details">
              <div
                onClick={closeDetails}
                className={classes.exit_button}
                data-testid="exit_btn"
              />
              <div className={classes.image_container}>
                <img
                  className={classes.image}
                  src={itemData.background_image || '/fallback.png'}
                  alt={`${itemData.name}_image`}
                />
              </div>
              <div className={classes.text_content}>
                <h2>{itemData.name}</h2>
                <h3>Description:</h3>
                <p>
                  {removeTags(itemData.description) ||
                    'Description not provided'}
                </p>
                <h3>Released: {itemData.released || 'No data availiable'}</h3>
                <div className={`${classes.platforms_wrapper}`}>
                  {itemData.platforms &&
                    itemData.platforms.map((platform) => {
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
          </>
        )}
      </div>
    </div>
  );
}
