import { auth } from '@/auth';
import { deleteUser, getAllUsersLimit } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { IUser } from '@/lib/db/models/user.model';
import Pagination from '@/components/page/pagination';
import DeleteDialog from '@/components/admin/delete-dialog';

export default async function AdminUserPage(props: {
  searchParams: Promise<{ page: string }>;
}) {
  // 관리자 확인
  const searchParams = await props.searchParams;
  const session = await auth();
  if (!session || session.user.role !== 'Admin') {
    redirect('/sign-in');
  }

  // 현재 페이지 파라미터 가져오기
  const page = Number(searchParams.page) || 1;
  const { users, totalUsers, totalPages, currentPage } = await getAllUsersLimit(
    {
      page,
      limit: 20,
    }
  );

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex items-center justify-center mb-6'>
        <h2 className='text-xl font-nexon'>
          사용자 목록 <span className='small'>{totalUsers}</span>
        </h2>
      </div>
      <Table className='table'>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>인증</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>가입</TableHead>
            <TableHead>방문</TableHead>
            <TableHead>수정</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: IUser) => (
            <TableRow key={user._id}>
              <TableCell>
                <Image
                  src={user.image || '/images/default.jpg'}
                  alt={user.name}
                  width={20}
                  height={20}
                  className='rounded-full inline mr-1.5 mt-[-2px]'
                />
                <span>{user.name}</span>
              </TableCell>
              <TableCell className='text-center'>{user.email}</TableCell>
              <TableCell className='text-center'>
                {user.emailVerified ? 'true' : 'false'}
              </TableCell>
              <TableCell className='text-center'>{user.role}</TableCell>
              <TableCell className='text-center'>
                {formatDate(user.createdAt)}
              </TableCell>
              <TableCell className='text-center'>{user.visitCount}</TableCell>
              <TableCell className='text-center'>
                <Button
                  variant='destructive'
                  size='sm'
                  className='mr-1 font-bold'
                >
                  수정
                </Button>
                <DeleteDialog id={user._id.toString()} action={deleteUser} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl='/admin/users'
      />
    </div>
  );
}
