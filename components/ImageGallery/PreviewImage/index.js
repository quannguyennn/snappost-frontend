import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import classNames from 'classnames';

const PreviewImage = ({ indexOfImage, upload, isOpen, toggle }) => {
  const [index, setIndex] = useState(indexOfImage || 0);

  useEffect(() => {
    const previewImageDOM = document.querySelector('.preview-image');

    function clickOutSide(evt) {
      const outside = ['div'];
      if (outside.includes(evt.target.tagName.toLowerCase())) {
        toggle();
      }
    }

    if (previewImageDOM) {
      previewImageDOM.addEventListener('click', clickOutSide);
    }

    return () => {
      previewImageDOM.removeEventListener('click', clickOutSide);
    }
  }, [isOpen]);

  const onClickPrevious = useCallback(() => {
    setIndex(index - 1);
  }, [index]);

  const onClickNext = useCallback(() => {
    setIndex(index + 1);
  }, [index])

  const canNext = useMemo(() => {
    return index === upload.length - 1;
  }, [index]);

  const canPrevious = useMemo(() => {
    return index === 0
  }, [index]);

  if (!upload) {
    return null;
  }

  return (
    <div className={classNames("preview-image", { "is-show": isOpen })}>
      <button className="preview-image__previous" onClick={onClickPrevious} disabled={canPrevious}>
        <MdNavigateBefore />
      </button>
      <div className="preview-image__content">
        {
          upload[index]['fileType'].includes("image") ? <img src={upload[index]['url']} alt="image" /> : (
            <React.Fragment key={upload[index]['url']}>
              <video controls>
                <source src={upload[index]['url']} type="video/mp4" />
              </video>
            </React.Fragment>
          )
        }
      </div>
      <button className="preview-image__next" onClick={onClickNext} disabled={canNext}>
        <MdNavigateNext />
      </button>
    </div>
  )
}
export default React.memo(PreviewImage);