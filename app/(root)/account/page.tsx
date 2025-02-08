import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default async function AccountPage() {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <section>
          <h2 className='text-xl font-nexon text-center mb-4'>
            내 정보 <span className='small'>{session.user.visitCount}</span>
          </h2>
          <div className='flex flex-col items-center justify-center'>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || ''}
                width={100}
                height={100}
                className='rounded-full mt-1 border ring ring-gray-300/20 hover:ring-gray-300/60 cursor-pointer'
              />
            )}
            <ul className='mt-3 text-center'>
              <li className='text-black200 font-bold'>{session.user.name}</li>
              <li className='text-muted-foreground'>{session.user.email}</li>
            </ul>
          </div>
          <div className='flex items-center gap-2 justify-center mt-8'>
            <Button variant='outline'>이름 변경</Button>
            <Button variant='outline'>비밀번호 변경</Button>
            <Button variant='outline'>회원 탈퇴</Button>
          </div>
        </section>
      ) : (
        <p className='text-sm text-muted-foreground mt-4'>
          로그인한 사용자가 없습니다.
        </p>
      )}
    </>
  );
}
