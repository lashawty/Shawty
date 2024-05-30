'use client'

import Link from "next/link"
import { CircleUser, Menu, TreePalm } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AuthContext } from "../provider"
import { useContext } from "react"

export function Nav() {
  const authContext = useContext(AuthContext);
  const isAuth = !!authContext.uid;
  
  const renderAuthButtons = () => {
    if (isAuth) {
      return (
        <>
          <DropdownMenuLabel>會員中心</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href="/dashboard"
              className="text-muted-foreground transition-colors hover:text-foreground w-full"
            >
              後臺管理
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer" 
            onClick={authContext.handleSignOut}>
              含淚登出
          </DropdownMenuItem>
        </>
      )
    }

    return (
      <>
          <DropdownMenuItem>
            <Link
              href="/login"
              className="text-muted-foreground transition-colors hover:text-foreground w-full"
            >
              立馬登入
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href="register"
              className="text-muted-foreground transition-colors hover:text-foreground w-full"
            >
              馬上加入
            </Link>
          </DropdownMenuItem>
        </>
    )
  }


  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 bg-background px-4 md:px-6 bg-slate-800 z-10 ">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <TreePalm className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <TreePalm className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {renderAuthButtons()}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
  )
}
