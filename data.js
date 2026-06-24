// 포트폴리오에 들어갈 모든 데이터 정의
const DATA = {
    // 1. 트러블슈팅 데이터
    troubleshooting: [
        {
            title: "특정 집계 쿼리 타임아웃 발생 및 인덱스 재구성을 통한 개선",
            context: "대용량 결제 테이블에서 특정 기간 조회 시 5초 이상 소요되며 가끔 시스템 타임아웃 발생.",
            analysis: "EXPLAIN PLAN 분석 결과, 결합 인덱스의 컬럼 순서가 잘못되어 Full Table Scan 및 대규모 Sort-Merge Join이 유발됨 확인.",
            action: "조회 조건 빈도와 카디널리티(Cardinality)를 분석하여 복합 인덱스(Composite Index) 컬럼 순서 재배치 및 쿼리 힌트(Hint) 적용.",
            result: "조회 응답 속도 96% 개선 (5.2초 -> 0.2초), CPU Peak 부하 안정화.",
            code: "-- 변경 전 인덱스: (STATUS, CREATED_AT)\n-- 변경 후 인덱스: (CREATED_AT, STATUS)\nSELECT /*+ INDEX(p idx_payment_created_status) */ * \nFROM payment p \nWHERE created_at >= '2026-01-01' AND status = 'COMPLETED';"
        }
    ],

    // 2. 아키텍처 및 백서 데이터
    architecture: [
        {
            title: "Oracle High Availability 복제(Replication) 구축 및 Failover 테스트",
            summary: "Data Guard 기반의 Async 복제 구조를 설계하고, Primary DB 장애 발생 시 Standby DB가 무중단으로 역할을 이행하는지 검증한 보고서입니다.",
            tags: ["Oracle", "Data Guard", "Replication", "HA"],
            docLink: "https://github.com/Determination-github" // 상세 노션이나 깃허브 위키 링크용
        },
        {
            title: "RMAN을 이용한 Backup & Recovery 시나리오 검증 백서",
            summary: "물리적 디스크 손상 상태를 가상으로 시뮬레이션(Datafile 유실)한 후, RMAN 백업본과 Redo Log를 이용해 무손실 완전 복구(Complete Recovery) 프로세스 정립.",
            tags: ["Oracle", "RMAN", "Backup", "Recovery"],
            docLink: "#"
        }
    ],

    // 3. 외부 블로그 링크 데이터 (요청하신 기능 ⭐️)
   blogLogs: [
        {
            date: "2026-06-23",
            title: "1회차 - 파이썬 기초",
            summary: "프로그래밍 프로토타이핑과 자동화 스크립트의 기본이 되는 데이터 입출력 제어, 형변환(Type Casting), 연산자 메커니즘 및 문자열 처리 기초를 정리했습니다.",
            tags: ["Python"],
            link: "https://blog.naver.com/10soong/224324868806"
        },
        {
            date: "2026-06-22",
            title: "데이터베이스 샤딩(Sharding) 도입 시 고려해야 할 트레이드오프",
            summary: "수평 분산 저장이 가져다주는 확장성과 데이터 정합성 유지 비용 사이의 딜레마 분석.",
            tags: ["Architecture", "Sharding"],
            link: "https://tistory.com/your-post"
        }
    ]
};
