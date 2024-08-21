'use client';
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  RedditIcon,
  LinkedinIcon,
} from 'react-share';

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <div className='bg-slate-50 rounded-lg shadow-md'>
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
        <RedditShareButton url={shareUrl} title={property.name}>
          <RedditIcon size={35} borderRadius={10} bgStyle={{ fill: 'red' }} />
        </RedditShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
        >
          <TwitterIcon size={35} borderRadius={10} />
        </TwitterShareButton>
        <LinkedinShareButton
          url={shareUrl}
          title={property.name}
          summary={property.description}
        >
          <LinkedinIcon size={35} borderRadius={10} />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default ShareButton;
