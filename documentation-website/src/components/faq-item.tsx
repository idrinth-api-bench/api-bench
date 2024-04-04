import React, {
  useState,
} from 'react';
import {
  ONE,
} from '../constants';
import Lang from './lang';
import './faq-item.css';

const FaqItem = ({
  index,
}: { index: number },) => {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false,);

  const toggleOpen = () => {
    setIsOpen(! isOpen,);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>,) => {
    if (e.key === 'Enter') {
      toggleOpen();
    }
  };

  return (
    <li tabIndex={index + ONE} onKeyDown={handleKeyDown} className={'faq-item'}>
      <div onClick={() => toggleOpen()} role="button">
        <div className="accordion-section">
          <h2>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              <Lang lnkey={`faq.questions.title_${ index + ONE }`} />
            }
          </h2>
          {isOpen ?
            <span className="up-arrow"></span>
            :
            <span className="down-arrow"></span>
          }
        </div>
      </div>
      {isOpen &&
        <p>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            <Lang lnkey={`faq.questions.description_${ index + ONE }`} />
          }
        </p>
      }
    </li>
  );
};

export default FaqItem;
