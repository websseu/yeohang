import Link from 'next/link';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { deletePost, getAllPostsLimit } from '@/lib/actions/post.actions';
import { Button } from '@/components/ui/button';
import { IPost } from '@/lib/db/models/post.model';
import { formatDate } from '@/lib/utils';
import DeleteDialog from '@/components/alert/delete-dialog';
import Pagination from '@/components/page/pagination';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

export const metadata: Metadata = {
  title: '글 목록',
};

export default async function AdminPostPage(props: {
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
  const { posts, totalPosts, totalPages, currentPage } = await getAllPostsLimit(
    {
      page,
      limit: 20,
    }
  );
  return (
    <section className='max-w-6xl mx-auto'>
      <div>
        <div className='flex items-center justify-center mb-4'>
          <h2 className='text-xl font-nexon'>
            글 목록 <span className='small'>{totalPosts}</span>
          </h2>
        </div>
        <div className='flex justify-end mb-2'>
          <Link href={'/admin/posts/create'}>
            <Button variant='outline'>글 작성하기</Button>
          </Link>
        </div>
      </div>

      <Table className='table'>
        <TableHeader>
          <TableRow>
            <TableHead>타이틀</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead>서브</TableHead>
            <TableHead>공개</TableHead>
            <TableHead>날짜</TableHead>
            <TableHead>댓글</TableHead>
            <TableHead>하트</TableHead>
            <TableHead>뷰</TableHead>
            <TableHead>수정</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post: IPost) => (
            <TableRow key={post._id}>
              <TableCell>{post.title}</TableCell>
              <TableCell className='text-center'>{post.category}</TableCell>
              <TableCell className='text-center'>{post.subCategory}</TableCell>
              <TableCell className='text-center'>
                {post.isPublished ? 'True' : 'False'}
              </TableCell>
              <TableCell className='text-center'>
                {formatDate(post.createdAt)}
              </TableCell>
              <TableCell className='text-center'>{post.numReviews}</TableCell>
              <TableCell className='text-center'>{post.numLikes}</TableCell>
              <TableCell className='text-center'>{post.numViews}</TableCell>
              <TableCell className='text-center'>
                <Button variant='destructive' size='sm' className='mr-1'>
                  <Link href={`/admin/posts/${post._id}`}>수정</Link>
                </Button>
                <DeleteDialog id={post._id.toString()} action={deletePost} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl='/admin/posts'
      />
    </section>
  );
}
