import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function AuthButton() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/sign-in')
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 no-underline">
          Logout
        </button>
      </form>
      <button className="bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 no-underline">
        <Link href="/dashboard" className=" no-underline">
          Dashboard
        </Link>
      </button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Link
        href="/sign-in"
        className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
      >
        Login
      </Link>

      <Link
        href="/tasks"
        className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
      >
        Tasks
      </Link>

      <Link
        href="/my-tasks"
        className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
      >
        My Tasks
      </Link>

      <Link
        href="/my-offers"
        className="bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline"
      >
        My Offers
      </Link>
    </div>
  )
}
