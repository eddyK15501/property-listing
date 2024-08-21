'use client';
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  RedditIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <div className='bg-white rounded-lg shadow-md'>
      <h3 className='text-md font-bold text-center pt-2'>
        Share This Property:
      </h3>
      <div className='flex justify-center gap-3 pb-4 !mt-2'>
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}
        >
          <FacebookIcon size={35} borderRadius={10} />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
        >
          <TwitterIcon size={35} borderRadius={10} />
        </TwitterShareButton>
        <RedditShareButton url={shareUrl} title={property.name}>
          <RedditIcon size={35} borderRadius={10} bgStyle={{ fill: 'red' }} />
        </RedditShareButton>
        <LinkedinShareButton
          url={shareUrl}
          title={property.name}
          summary={property.description}
        >
          <LinkedinIcon size={35} borderRadius={10} />
        </LinkedinShareButton>
        <WhatsappShareButton url={shareUrl} title={property.name}>
          <WhatsappIcon size={35} borderRadius={10} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareButton;
