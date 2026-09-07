import { diagrams } from './diagrams.js';

/**
 * Django Commerce Portfolio Configuration (DTO)
 * Awwwards-Standard Swiss Minimalist Specification
 */
export const portfolioConfig = {
    brand: 'YOHAN · BACKEND ARCHITECT',
    navLinks: [
        { label: 'Case Studies', href: '#cases' },
        { label: 'Architecture Docs ↗', href: 'https://ramyo564.github.io/Upgrade_Django4/', target: '_blank' },
        { label: 'GitHub ↗', href: 'https://github.com/ramyo564/Upgrade_Django4', target: '_blank' },
        { label: 'Contact', href: 'mailto:yohan032yohan@gmail.com' }
    ],
    hero: {
        kicker: 'Notion Portfolio Verification Funnel',
        headline: 'DJANGO COMMERCE ARCHITECTURE.<br>SESSION INTEGRITY & SECURITY.<br>CLOUD RUNTIME STABILITY.',
        description: 'Django 4.2 커머스 시스템의 인증 보안, 장바구니 세션 병합, 결제 후처리 표준화 및 AWS Beanstalk + RDS PostgreSQL 클라우드 이관 과정을 기계적 실측 증거와 코드로 검증하는 포트폴리오입니다.',
        killerMetrics: [
            { number: 'Zero Leak', label: 'Cart Session Merge', desc: '비회원→로그인 장바구니 100% 보존' },
            { number: 'Honeypot', label: 'Admin Security', desc: '가짜 /admin 공격 표면 원천 차단' },
            { number: 'Unified', label: 'Payment Pipeline', desc: 'PayPal & KakaoPay 상태 전이 일원화' },
            { number: 'Cloud Sync', label: 'AWS EB + RDS', desc: 'PostgreSQL 무중단 마이그레이션' }
        ]
    },
    sectionIntro: {
        tag: 'Evidence Showcase',
        headline: '핵심 트러블슈팅 및 아키텍처 다이어그램',
        hint: '다이어그램을 클릭하면 고해상도 벡터 원본으로 확대 검증할 수 있습니다.'
    },
    cases: [
        {
            number: '01',
            category: 'AUTH & SECURITY',
            period: '2023.05',
            shortTitle: '이메일 인증 및 허니팟 보안 강화',
            highlightMetric: '공격 표면 축소 & 유령 계정 차단',
            title: '이메일 인증 토큰 검증 및 허니팟 관리자 보안 강화',
            summary: '회원가입 계정 신뢰도와 관리자 경로 공격 방어를 위해 이메일 uid/token 검증 활성화 플로우를 구축하고, /admin 경로를 honeypot으로 분리해 무차별 대입 공격을 원천 차단했습니다.',
            metrics: [
                { label: 'ACCOUNT TRUST', value: '미인증 유령 계정 100% 차단', highlight: true },
                { label: 'ATTACK SURFACE', value: '/admin (Honeypot) & /securelogin 분리' },
                { label: 'TOKEN FLOW', value: 'default_token_generator.check_token' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: '이메일 인증 활성화 및 관리자 허니팟 방어 흐름',
                    mermaidId: 'case-auth-security-hardening'
                }
            ],
            detailLink: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/accounts/views.py',
            detailLinkLabel: '핵심 구현 코드 확인 (accounts/views.py) ↗'
        },
        {
            number: '02',
            category: 'COMMERCE CORE',
            period: '2023.05',
            shortTitle: '세션 장바구니 로그인 병합',
            highlightMetric: '장바구니 유실률 0% (전환율 방어)',
            title: '로그인 시 세션 장바구니 병합 및 옵션 단위 상태 일관성 확보',
            summary: '비회원 상태에서 담은 장바구니 품목이 로그인 후 계정 장바구니와 단절되거나 중복되는 문제를 variation 단위 집합 비교 및 수량 병합 로직으로 해결했습니다.',
            metrics: [
                { label: 'CART PRESERVATION', value: '비회원 장바구니 품목 100% 보존', highlight: true },
                { label: 'DEDUP RULE', value: 'Variation 단위 비교 후 수량 증가' },
                { label: 'STATE SYNC', value: 'Session cart_id → User CartItem 리바인딩' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: '세션 장바구니 로그인 병합 및 Variation 중복 처리 플로우',
                    mermaidId: 'case-session-cart-merge'
                }
            ],
            detailLink: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/carts/views.py',
            detailLinkLabel: '핵심 구현 코드 확인 (carts/views.py) ↗'
        },
        {
            number: '03',
            category: 'PAYMENT INTEGRATION',
            period: '2023.05 – 2023.06',
            shortTitle: 'PayPal / Kakao 결제 후처리 표준화',
            highlightMetric: '결제 채널 무관 상태 전이 일원화',
            title: '이종 결제 수단(PayPal SDK / KakaoPay REST) 후처리 파이프라인 통합',
            summary: 'SDK 기반 PayPal과 REST 기반 KakaoPay의 결제 승인 후처리를 단일 주문 확정 파이프라인으로 표준화하여 재고 차감, 주문상품 이관, 카트 삭제 누락 위험을 제거했습니다.',
            metrics: [
                { label: 'ORDER STATE', value: '결제 수단 무관 주문 상태 표준화', highlight: true },
                { label: 'TRANSACTION', value: 'CartItem → OrderProduct + 재고 차감 + 카트 정리' },
                { label: 'CHANNELS', value: 'PayPal SDK & KakaoPay REST API' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: 'PayPal/Kakao 통합 결제 승인 및 주문 확정 파이프라인',
                    mermaidId: 'case-payment-unified-postprocess'
                }
            ],
            detailLink: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/orders/views.py',
            detailLinkLabel: '핵심 구현 코드 확인 (orders/views.py) ↗'
        },
        {
            number: '04',
            category: 'DATA INTEGRITY',
            period: '2023.05',
            shortTitle: '리뷰 권한 가드 및 평점 집계 단일화',
            highlightMetric: '어뷰징 후기 100% 차단',
            title: '구매자 기반 리뷰 작성 권한 가드 및 상품 평점 집계 모델화',
            summary: '무작위 어뷰징 후기를 차단하기 위해 실구매 완료자만 리뷰를 작성할 수 있는 도메인 가드를 구축하고, Product 모델 레벨의 평점 집계 쿼리로 뷰 연산 부하를 경감했습니다.',
            metrics: [
                { label: 'REVIEW INTEGRITY', value: '비구매자 작성 100% 원천 차단', highlight: true },
                { label: 'AGGREGATION', value: 'Product.averageReview / countReview 단일화' },
                { label: 'PERMISSION', value: 'OrderProduct.is_ordered 구매 검증' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: '실구매자 리뷰 검증 가드 및 평점 집계 파이프라인',
                    mermaidId: 'case-review-trust-guard'
                }
            ],
            detailLink: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/store/views.py',
            detailLinkLabel: '핵심 구현 코드 확인 (store/views.py) ↗'
        },
        {
            number: '05',
            category: 'SEARCH & QUERY UX',
            period: '2023.05',
            shortTitle: '복합 검색/정렬/필터 및 페이징 최적화',
            highlightMetric: '정렬 Null 방어 & 페이징 일관성',
            title: '복합 조건 검색, Case/When 기반 평점 정렬 및 페이징 UX 고도화',
            summary: '키워드 및 카테고리 복합 검색 시 필터 조건이 유실되지 않도록 파라미터를 유지하고, 리뷰가 없는 상품의 null 정렬 오류를 Case/When 구문으로 방어하여 안정적인 페이징을 구현했습니다.',
            metrics: [
                { label: 'SEARCH RELIABILITY', value: '복합 필터링 시 파라미터 100% 유지', highlight: true },
                { label: 'SORT INTEGRITY', value: 'Case/When Coalesce 기반 Null 정렬 방어' },
                { label: 'PAGINATION', value: 'Django Paginator 기반 페이지네이션' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: '복합 검색 필터 조합 및 정렬/페이징 처리 흐름',
                    mermaidId: 'case-search-sort-filter-paginator'
                }
            ],
            detailLink: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/store/views.py',
            detailLinkLabel: '검색 쿼리 소스 코드 보기 ↗'
        },
        {
            number: '06',
            category: 'CLOUD & DEVOPS',
            period: '2023.06',
            shortTitle: 'RDS PostgreSQL 이관 및 EB 자동 배포',
            highlightMetric: '클라우드 무중단 배포 파이프라인',
            title: 'AWS Elastic Beanstalk 환경 구축 및 RDS PostgreSQL 무중단 이관',
            summary: '로컬 SQLite 환경에서 운영급 RDS PostgreSQL로 스키마 및 데이터를 안전하게 마이그레이션하고, .ebextensions 설정을 통해 컨테이너 WSGI 및 정적 파일 수집 배포를 자동화했습니다.',
            metrics: [
                { label: 'DEPLOYMENT', value: 'Elastic Beanstalk 기반 배포 루틴 고정', highlight: true },
                { label: 'DATABASE', value: 'SQLite → AWS RDS PostgreSQL 무중단 이전' },
                { label: 'CONFIG AUTOMATION', value: '.ebextensions/db-migrate.config 자동화' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: 'AWS Elastic Beanstalk 및 RDS VPC 클라우드 배포 토폴로지',
                    mermaidId: 'case-aws-migration-vpc'
                }
            ],
            detailLink: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/greatkart/settings.py',
            detailLinkLabel: '인프라 설정 확인 (settings.py) ↗'
        }
    ],
    diagrams
};
