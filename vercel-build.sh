#!/bin/bash
# Vercel build script to ensure Prisma generates client

npx prisma generate
npm run build
