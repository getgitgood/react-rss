import classes from './Details.module.scss';
import { MouseEvent, useState } from 'react';
import { removeTags } from '../../utils/helpers';
import { changeClassName } from '../../utils/helpers';
import { DetailedCardResponse } from '../../types';
import { useRouter } from 'next/router';

export default function Details({
  detailsData
}: {
  detailsData: DetailedCardResponse;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const { search, page, page_size } = router.query;

  const closeDetails = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setIsOpen(false);
      router.push(
        {
          pathname: `/`,
          query: {
            search: search || 'all',
            page: page || '1',
            page_size: page_size || '20'
          }
        },
        `/games/${search || 'all'}?page=${page || '1'}`,
        { scroll: false }
      );
    }
  };

  return (
    isOpen && (
      <div className={classes.overlay} onClick={closeDetails}>
        <div className={classes.details}>
          <div className={classes.container} data-testid="details">
            <div
              onClick={closeDetails}
              className={classes.exit_button}
              data-testid="exit_btn"
            />
            <div className={classes.image_container}>
              <img
                className={classes.image}
                src={detailsData?.background_image || '/fallback.png'}
                alt={`${detailsData?.name}_image`}
              />
            </div>
            <div className={classes.text_content}>
              <h2>{detailsData?.name}</h2>
              <h3>Description:</h3>
              <p>
                {detailsData?.description
                  ? removeTags(detailsData?.description)
                  : 'Description not provided'}
              </p>
              <h3>Released: {detailsData?.released || 'No data available'}</h3>
              <div className={`${classes.platforms_wrapper}`}>
                {detailsData?.platforms?.map((platform) => {
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
        </div>
      </div>
    )
  );
}
