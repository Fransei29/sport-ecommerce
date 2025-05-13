import NextAuth from "next-auth";
void NextAuth;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}
