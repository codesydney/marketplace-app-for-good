import AuthButton from '../components/AuthButton'
import Header from '@/components/Header'

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
        <div className="flex w-full max-w-4xl items-center justify-end p-3 text-sm">
          <AuthButton />
        </div>
      </nav>

      <div className="animate-in flex max-w-4xl flex-1 flex-col gap-20 px-3 opacity-0">
        <Header />
        <main className="flex flex-1 flex-col gap-6">
          <h2 className="mb-4 text-4xl font-bold">Next steps</h2>
        </main>
      </div>

      <footer className="border-t-foreground/10 flex w-full justify-center border-t p-8 text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  )
}
