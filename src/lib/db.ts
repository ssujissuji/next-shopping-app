import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// PrismaClient 인스턴스를 전역으로 관리하여 핫 리로드 시에도 동일한 인스턴스를 사용하도록 함
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// PostgreSQL 연결을 위한 Pool과 PrismaPg 어댑터 설정
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 커넥션 풀을 관리해주는 pg와 prisma를 연결하는 어댑터 생성
const adapter = new PrismaPg(pool);

// PrismaClient 인스턴스 생성 (이미 존재하면 기존 인스턴스 사용)
// 여기서 내보내지는 prisma 객체는 애플리케이션 전체에서 재사용됩니다
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
