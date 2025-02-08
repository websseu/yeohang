import Link from 'next/link';
import { GiMoebiusStar } from 'react-icons/gi';

export default function LeftButton() {
  return (
    <div className='absolute left-4'>
      <Link href='/' className='circle'>
        <GiMoebiusStar size='20' />
      </Link>
    </div>
  );
}
