import { APP_COPYRIGHT, APP_NAME } from '@/lib/constants';
// import { auth } from '@/auth';
// import Image from 'next/image';

export default async function Footer() {
  // const session = await auth();

  return (
    <footer className='footer__container'>
      <div className='border-t border-black py-10'>
        <h6 className='text-md font-bold font-nanum'>{APP_NAME}</h6>
        <p className='text-xs mt-1 text-muted-foreground font-medium font-nexon'>
          {APP_COPYRIGHT}
        </p>
      </div>

      {/* 사용자 정보 표시 */}
      {/* {session?.user ? (
        <div className='mt-4 font-nanum'>
          <ul className='mt-2 space-y-1 text-sm text-muted-foreground'>
            {session.user.image && (
              <li>
                <Image
                  src={session.user.image}
                  alt={session.user.name || ''}
                  width={50}
                  height={50}
                  className='rounded-full mt-1'
                />
              </li>
            )}
            <li>
              <strong>이름:</strong> {session.user.name}
            </li>
            <li>
              <strong>이메일:</strong> {session.user.email || '없음'}
            </li>
            <li>
              <strong>아이디:</strong> {session.user.id}
            </li>
            <li>
              <strong>역할:</strong> {session.user.role || '사용자'}
            </li>
            <li>
              <strong>방문 횟수:</strong> {session.user.visitCount || 0}
            </li>
          </ul>
        </div>
      ) : (
        <p className='text-sm text-muted-foreground mt-4'>
          로그인한 사용자가 없습니다.
        </p>
      )} */}
    </footer>
  );
}
