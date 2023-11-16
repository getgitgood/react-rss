import { useNavigate, useParams } from 'react-router-dom';

import { makeDetailsRequest } from '../../api/apiClient';
import classes from './Details.module.scss';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { removeTags } from '../../utils/helpers';
import platformsSlugData from '../../utils/platformsSlugData';
import { AppContext } from '../Context/Context';

export default function Details() {
  const { singleGameData, setSingleGameData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { cardId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const itemLoader = async () => {
      setIsLoading(true);
      try {
        const singleGameData = await makeDetailsRequest(cardId);
        setSingleGameData(singleGameData);
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    };
    itemLoader();
  }, [cardId, setSingleGameData]);

  const closeDetails = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      navigate('..');
      setIsOpen(false);
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
          isOpen && (
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
                    src={singleGameData.background_image || '/fallback.png'}
                    alt={`${singleGameData.name}_image`}
                  />
                </div>
                <div className={classes.text_content}>
                  <h2>{singleGameData.name}</h2>
                  <h3>Description:</h3>
                  <p>
                    {removeTags(singleGameData.description) ||
                      'Description not provided'}
                  </p>
                  <h3>
                    Released: {singleGameData.released || 'No data available'}
                  </h3>
                  <div className={`${classes.platforms_wrapper}`}>
                    {singleGameData.platforms &&
                      singleGameData.platforms.map((platform) => {
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
          )
        )}
      </div>
    </div>
  );
}
