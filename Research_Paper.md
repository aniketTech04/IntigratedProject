# Cloud and Big Data Analytics Platform for User Behavior Analysis in Enterprise Networks

## A Project Report / Research Paper

**Submitted in partial fulfillment of the requirements for the degree of**
**Bachelor of Engineering / Bachelor of Technology**

---

| | |
|---|---|
| **Project Title** | Cloud and Big Data Analytics Platform for User Behavior Analysis in Enterprise Networks |
| **Domain** | Cloud Computing, Big Data Analytics, Cybersecurity |
| **Technology Stack** | React.js, Node.js, Express.js, Recharts, Vite |
| **Academic Year** | 2025–2026 |

---

## Table of Contents

1. [Abbreviations](#1-abbreviations)
2. [Introduction](#2-introduction)
3. [Objective](#3-objective)
4. [Software Requirement Specifications](#4-software-requirement-specifications)
5. [Preliminary Investigation](#5-preliminary-investigation)
6. [Feasibility Study](#6-feasibility-study)
7. [Drawbacks of Existing System](#7-drawbacks-of-existing-system)
8. [Advantages of Proposed System](#8-advantages-of-proposed-system)
9. [Timeline — Gantt Chart](#9-timeline--gantt-chart)
10. [Hardware and Software Requirements](#10-hardware-and-software-requirements)
11. [Software Design Documentation](#11-software-design-documentation)
12. [Process Design — DFD and UML](#12-process-design--dfd-and-uml)
13. [Database Design — ER Diagram](#13-database-design--er-diagram)
14. [Input Design Layout](#14-input-design-layout)
15. [Output Design Layout](#15-output-design-layout)
16. [Code with Screenshots](#16-code-with-screenshots)
17. [Testing and Implementation](#17-testing-and-implementation)
18. [Implementation Steps](#18-implementation-steps)
19. [Maintenance Steps](#19-maintenance-steps)
20. [Future Scope and Conclusion](#20-future-scope-and-conclusion)
21. [References](#21-references)

---

## 1. Abbreviations

| Abbreviation | Full Form |
|---|---|
| **API** | Application Programming Interface |
| **CORS** | Cross-Origin Resource Sharing |
| **CPU** | Central Processing Unit |
| **CRUD** | Create, Read, Update, Delete |
| **CSS** | Cascading Style Sheets |
| **CSV** | Comma-Separated Values |
| **DFD** | Data Flow Diagram |
| **DNS** | Domain Name System |
| **ER** | Entity Relationship |
| **FTP** | File Transfer Protocol |
| **GB** | Gigabyte |
| **GUI** | Graphical User Interface |
| **HTML** | HyperText Markup Language |
| **HTTP** | HyperText Transfer Protocol |
| **HTTPS** | HyperText Transfer Protocol Secure |
| **IMAP** | Internet Message Access Protocol |
| **IP** | Internet Protocol |
| **JSON** | JavaScript Object Notation |
| **JSX** | JavaScript XML |
| **KPI** | Key Performance Indicator |
| **LDAP** | Lightweight Directory Access Protocol |
| **MB** | Megabyte |
| **MVC** | Model–View–Controller |
| **NPM** | Node Package Manager |
| **OS** | Operating System |
| **PII** | Personally Identifiable Information |
| **RAM** | Random Access Memory |
| **RDP** | Remote Desktop Protocol |
| **REST** | Representational State Transfer |
| **SDLC** | Software Development Life Cycle |
| **SIEM** | Security Information and Event Management |
| **SMB** | Server Message Block |
| **SMTP** | Simple Mail Transfer Protocol |
| **SOC** | Security Operations Center |
| **SQL** | Structured Query Language |
| **SSH** | Secure Shell |
| **SRS** | Software Requirement Specification |
| **SSL** | Secure Sockets Layer |
| **TB** | Terabyte |
| **UEBA** | User and Entity Behavior Analytics |
| **UI** | User Interface |
| **UML** | Unified Modeling Language |
| **URL** | Uniform Resource Locator |
| **VPN** | Virtual Private Network |

---

## 2. Introduction

The exponential growth of digital infrastructure in modern enterprises has led to an equally rapid increase in cybersecurity threats originating from within organizational networks. Traditional perimeter-based security measures, such as firewalls and intrusion detection systems, are no longer sufficient to protect against sophisticated insider threats, credential misuse, and advanced persistent threats that exploit legitimate user access.

**User and Entity Behavior Analytics (UEBA)** has emerged as a critical discipline within cybersecurity. UEBA systems establish baselines of normal behavior for each user and entity in an enterprise network, then detect deviations from these baselines that may indicate compromised accounts, malicious insiders, or policy violations.

This project presents the design and implementation of a **Cloud and Big Data Analytics Platform** that addresses the need for comprehensive user behavior analysis in enterprise networks. The platform integrates concepts from **cloud computing** (scalable service architecture), **big data analytics** (processing and analyzing large volumes of user activity logs), and **cybersecurity** (anomaly detection and threat identification).

The system provides security analysts with:
- **Real-time dashboards** displaying key performance indicators and activity timelines
- **User behavior profiling** with risk scores computed through statistical analysis
- **Anomaly detection** using Z-score analysis and rule-based engines
- **Network traffic analytics** with protocol-level visibility
- **Automated alerting** with severity-based classification and investigation workflows
- **Report generation** for compliance and audit purposes

The platform is built using modern web technologies — **React.js** for the frontend and **Node.js/Express** for the backend — following a client–server architecture with RESTful API communication.

---

## 3. Objective

The primary objectives of this project are as follows:

1. **Design a scalable analytics platform** that can ingest, process, and visualize large volumes of user activity data generated across enterprise networks.

2. **Implement a behavioral anomaly detection engine** that employs both statistical methods (Z-score analysis) and rule-based heuristics to identify abnormal user actions in real time.

3. **Build an interactive, premium-quality dashboard** that allows security analysts to monitor user behavior, investigate alerts, and assess the organizational risk posture at a glance.

4. **Provide comprehensive user profiling** by aggregating activity metrics per user, including login patterns, data transfer volumes, access times, and failure rates, and computing a composite risk score.

5. **Enable network traffic analysis** with protocol distribution, traffic volume trends, and identification of suspicious source IPs to support network-level security decisions.

6. **Generate automated security reports** for compliance auditing, incident response, and executive briefings.

7. **Demonstrate the integration of cloud computing and big data analytics principles** in a cybersecurity context, suitable for academic research and enterprise deployment.

---

## 4. Software Requirement Specifications

### 4.1 Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | The system shall display a real-time dashboard with KPIs (total users, active sessions, alerts, traffic volume) | High |
| FR-02 | The system shall generate synthetic user activity data representing enterprise network usage | High |
| FR-03 | The system shall compute risk scores for each user based on behavioral analysis | High |
| FR-04 | The system shall detect anomalies using Z-score statistical analysis | High |
| FR-05 | The system shall detect anomalies using rule-based heuristics (off-hours access, excessive downloads, brute-force attempts, geo-impossible travel) | High |
| FR-06 | The system shall allow filtering and searching of users by name, department, and risk level | Medium |
| FR-07 | The system shall display individual user behavior profiles with activity breakdown charts | Medium |
| FR-08 | The system shall classify alerts by severity: Critical, High, Medium, Low | High |
| FR-09 | The system shall provide a modal view with alert details and investigation actions | Medium |
| FR-10 | The system shall display network traffic analytics with protocol distribution | Medium |
| FR-11 | The system shall list and manage generated security reports | Low |
| FR-12 | The system shall provide a settings interface for tuning anomaly detection thresholds | Medium |

### 4.2 Non-Functional Requirements

| ID | Requirement | Category |
|---|---|---|
| NFR-01 | The dashboard shall load within 3 seconds on a standard broadband connection | Performance |
| NFR-02 | The UI shall be responsive across desktop and tablet screen sizes | Usability |
| NFR-03 | The system shall use a dark-themed design for extended analyst usage | Usability |
| NFR-04 | The API shall respond within 500 ms for all endpoints | Performance |
| NFR-05 | The platform shall support add-on of database persistence without API changes | Maintainability |
| NFR-06 | The system shall follow RESTful API conventions | Interoperability |
| NFR-07 | The codebase shall be modular and component-based | Maintainability |

### 4.3 User Characteristics

| User Role | Description |
|---|---|
| Security Analyst | Primary user — monitors dashboards, investigates alerts, reviews user profiles |
| SOC Manager | Supervory user — reviews reports, configures thresholds, performs trend analysis |
| IT Administrator | Configures platform settings, manages data retention policies |
| Executive / CISO | Consumes executive summary reports, views high-level risk metrics |

---

## 5. Preliminary Investigation

### 5.1 Problem Statement

Enterprise networks generate millions of log events daily from diverse sources — login systems, file servers, email gateways, VPNs, databases, and web proxies. Manually monitoring these logs for security threats is infeasible. Existing SIEM tools like Splunk, IBM QRadar, and Microsoft Sentinel are expensive, complex, and require extensive infrastructure.

There is a need for a **lightweight, web-based analytics platform** that demonstrates core UEBA concepts — behavioral baselining, statistical anomaly detection, and risk scoring — without requiring expensive enterprise software licenses.

### 5.2 Scope of Investigation

The investigation covers:
- **Existing enterprise UEBA solutions** and their architectural patterns
- **Statistical anomaly detection methods** applicable to user behavior data
- **Modern web technologies** capable of building responsive analytics dashboards
- **Synthetic data generation** techniques to simulate realistic enterprise user activity

### 5.3 Findings

1. **UEBA Market**: The global UEBA market is projected to grow from $1.2 billion (2023) to $4.2 billion (2028), indicating strong demand for user behavior analysis platforms.
2. **Statistical Methods**: Z-score analysis is widely used in anomaly detection for its simplicity and effectiveness on normally distributed data. Combined with rule-based heuristics, it provides comprehensive coverage.
3. **Web Technologies**: React.js and Node.js provide the performance and flexibility needed for real-time data visualization. Libraries like Recharts offer enterprise-grade charting capabilities.
4. **Synthetic Data**: Generating realistic synthetic data eliminates privacy concerns and allows for controlled anomaly injection for testing and demonstration.

---

## 6. Feasibility Study

### 6.1 Technical Feasibility

| Component | Technology | Feasibility |
|---|---|---|
| Frontend UI | React.js 18 + Vite | ✅ Mature ecosystem, extensive component libraries |
| Data Visualization | Recharts | ✅ Supports area, bar, pie charts with animations |
| Backend API | Node.js + Express | ✅ Lightweight, high-performance HTTP server |
| Anomaly Detection | Custom JS (Z-score + rules) | ✅ Algorithmic simplicity, no external ML framework needed |
| Data Storage | In-memory (synthetic) | ✅ Zero infrastructure requirements for demo |
| Communication | REST API + JSON | ✅ Standard, well-understood protocol |

**Conclusion**: The project is technically feasible using open-source web technologies without any proprietary software dependencies.

### 6.2 Economic Feasibility

| Item | Cost |
|---|---|
| Development tools (VS Code, Node.js, npm) | Free / Open Source |
| Libraries (React, Express, Recharts, Lucide) | Free / MIT License |
| Hosting (development) | Localhost — no cost |
| Cloud deployment (optional) | Free tiers available (Vercel, Railway, Render) |
| **Total Development Cost** | **₹0 (zero)** |

**Conclusion**: The project is economically feasible as it relies entirely on free and open-source technologies.

### 6.3 Operational Feasibility

- The web-based interface requires no specialized training — any analyst familiar with browser-based dashboards can operate the system.
- The dark-themed UI is designed for extended monitoring sessions common in SOC environments.
- Settings are configurable through a dedicated UI — no code changes needed for threshold tuning.

**Conclusion**: The project is operationally feasible for the target user base.

---

## 7. Drawbacks of Existing System

| # | Drawback | Description |
|---|---|---|
| 1 | **High Cost** | Enterprise SIEM/UEBA tools (Splunk, IBM QRadar, Microsoft Sentinel) require expensive licenses — often $50,000–$500,000/year. |
| 2 | **Complex Setup** | Existing solutions require dedicated infrastructure, database clusters, and weeks of configuration and tuning. |
| 3 | **Heavy Resource Usage** | Traditional SIEM platforms consume significant CPU, memory, and storage, requiring dedicated server hardware. |
| 4 | **Steep Learning Curve** | Security analysts require extensive training to use complex SIEM query languages (SPL for Splunk, KQL for Sentinel). |
| 5 | **Limited Customization** | Vendor-built dashboards offer limited customization without proprietary scripting or plugin development. |
| 6 | **Vendor Lock-in** | Organizations become dependent on the vendor's ecosystem, making migration costly and difficult. |
| 7 | **Manual Correlation** | Many existing systems require manual correlation of events across different log sources. |
| 8 | **Delayed Alerts** | Batch processing in traditional systems may result in delayed anomaly detection rather than real-time alerting. |

---

## 8. Advantages of Proposed System

| # | Advantage | Description |
|---|---|---|
| 1 | **Zero Cost** | Built entirely with free, open-source technologies — no licensing fees or subscriptions. |
| 2 | **Lightweight Architecture** | Runs on a standard laptop/desktop with Node.js — no dedicated servers or databases required for the demo. |
| 3 | **Real-Time Analytics** | API-driven architecture provides instant data retrieval and visualization with sub-second response times. |
| 4 | **Intuitive UI** | Premium dark glassmorphism design with interactive charts requires minimal analyst training. |
| 5 | **Statistical Anomaly Detection** | Z-score analysis automatically identifies users whose behavior deviates significantly from the baseline. |
| 6 | **Multi-Dimensional Analysis** | Combines rule-based heuristics (off-hours access, brute-force, geo-impossible travel) with statistical methods for comprehensive detection. |
| 7 | **Modular Design** | Component-based React frontend and RESTful API allow easy extension and modification of individual modules. |
| 8 | **Synthetic Data Simulation** | Built-in data generator creates realistic enterprise scenarios, ideal for training, demo, and testing. |
| 9 | **Risk Scoring** | Composite risk scores per user enable priority-based investigation by the security team. |
| 10 | **Scalable Architecture** | The REST API design allows seamless migration from in-memory data to production databases (MongoDB, PostgreSQL) without frontend changes. |

---

## 9. Timeline — Gantt Chart

```
Phase                        | Week 1 | Week 2 | Week 3 | Week 4 | Week 5 | Week 6 | Week 7 | Week 8
─────────────────────────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────
Requirement Analysis         | ██████ | ███    |        |        |        |        |        |
Literature Survey            | ██████ | ██████ |        |        |        |        |        |
System Design (DFD, UML, ER) |        | ███    | ██████ |        |        |        |        |
Backend Development          |        |        | ███    | ██████ | ███    |        |        |
  └ Data Generator           |        |        | ██████ |        |        |        |        |
  └ Anomaly Detection Engine |        |        |        | ██████ |        |        |        |
  └ REST API Endpoints       |        |        |        | ███    | ███    |        |        |
Frontend Development         |        |        |        | ███    | ██████ | ██████ |        |
  └ UI Shell (Sidebar/Topbar)|        |        |        | ██████ |        |        |        |
  └ Dashboard Page           |        |        |        |        | ██████ |        |        |
  └ Users & User Detail      |        |        |        |        | ██████ |        |        |
  └ Alerts Page              |        |        |        |        |        | ███    |        |
  └ Network Analytics        |        |        |        |        |        | ███    |        |
  └ Reports & Settings       |        |        |        |        |        | ██████ |        |
Integration & Testing        |        |        |        |        |        | ███    | ██████ |
Documentation & Report       |        |        |        |        |        |        | ██████ | ██████
Presentation & Submission    |        |        |        |        |        |        |        | ██████
```

---

## 10. Hardware and Software Requirements

### 10.1 Hardware Requirements

| Component | Minimum Requirement | Recommended |
|---|---|---|
| Processor | Intel Core i3 / AMD Ryzen 3 | Intel Core i5 / AMD Ryzen 5 or higher |
| RAM | 4 GB | 8 GB or higher |
| Storage | 500 MB free disk space | 1 GB SSD |
| Display | 1366 × 768 resolution | 1920 × 1080 Full HD |
| Network | Broadband internet (for npm installation) | Ethernet / fast Wi-Fi |

### 10.2 Software Requirements

| Component | Requirement | Version |
|---|---|---|
| Operating System | Windows 10/11, macOS, or Linux (Ubuntu 20.04+) | Any modern OS |
| Runtime | Node.js | v18.x or higher |
| Package Manager | npm | v9.x or higher |
| Browser | Google Chrome / Mozilla Firefox / Microsoft Edge | Latest stable |
| Code Editor | VS Code (recommended) | Latest |
| Version Control | Git | v2.x |

### 10.3 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Framework | React.js 18 | Component-based UI development |
| Build Tool | Vite 5 | Fast development server and build |
| Charting Library | Recharts 2.12 | Interactive data visualizations |
| Icon Library | Lucide React | SVG iconography |
| Routing | React Router DOM 6 | Client-side page navigation |
| Backend Framework | Express.js 4 | RESTful API server |
| CORS Middleware | cors | Cross-origin request handling |
| Styling | Vanilla CSS | Custom dark glassmorphism theme |

---

## 11. Software Design Documentation

### 11.1 System Architecture

The platform follows a **Client–Server Architecture** with clear separation of concerns:

```
┌────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ Dashboard │ │  Users   │ │  Alerts  │ │ Network Analytics│ │
│  └─────┬────┘ └─────┬────┘ └─────┬────┘ └────────┬─────────┘ │
│        │             │           │                │            │
│  ┌─────┴─────────────┴───────────┴────────────────┴─────────┐ │
│  │              React Router + State Management              │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             │ HTTP/JSON                        │
└─────────────────────────────┼──────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   Vite Dev Proxy   │
                    └─────────┬─────────┘
                              │
┌─────────────────────────────┼──────────────────────────────────┐
│                     SERVER (Node.js)                            │
│  ┌──────────────────────────┴────────────────────────────────┐ │
│  │                   Express.js + CORS                        │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             │                                   │
│  ┌──────────────────────────┴────────────────────────────────┐ │
│  │                    REST API Routes                         │ │
│  │  /api/dashboard  /api/users  /api/alerts  /api/analytics   │ │
│  └───────┬──────────────────┬────────────────────────────────┘ │
│          │                  │                                   │
│  ┌───────┴────────┐ ┌──────┴─────────┐                        │
│  │  Data Generator │ │ Anomaly Engine │                        │
│  │  (Synthetic)    │ │ (Z-Score +     │                        │
│  │  Users, Logs,   │ │  Rule-Based)   │                        │
│  │  Traffic, Alerts│ │                │                        │
│  └────────────────┘ └────────────────┘                        │
└────────────────────────────────────────────────────────────────┘
```

### 11.2 Module Design

| Module | File | Responsibility |
|---|---|---|
| **Data Generator** | `server/data/generator.js` | Generates synthetic users (50), activity logs (500), network traffic (200), alerts (40), dashboard KPIs, behavior analytics, network analytics, reports |
| **Anomaly Detector** | `server/analytics/anomalyDetector.js` | Z-score analysis on activity volumes and data transfer; rule-based flagging for off-hours access, failed logins, excessive downloads, multi-IP connections |
| **API Router** | `server/routes/api.js` | Exposes 7 REST endpoints with filtering and sorting query parameters |
| **Dashboard** | `src/pages/Dashboard.jsx` | 8 KPI cards, area chart, pie chart, bar charts, alerts table |
| **User Analysis** | `src/pages/Users.jsx` | Filterable/searchable user table with risk score visualization |
| **User Detail** | `src/pages/UserDetail.jsx` | Individual behavior profile with activity breakdown, login distribution, alerts, activity log |
| **Alerts** | `src/pages/Alerts.jsx` | Severity-filtered alert feed with detail modal and investigation actions |
| **Network Analytics** | `src/pages/NetworkAnalytics.jsx` | Traffic volume chart, protocol pie chart, top source IPs table |
| **Reports** | `src/pages/Reports.jsx` | Report cards grid with metadata and download trigger |
| **Settings** | `src/pages/Settings.jsx` | Anomaly threshold forms, notification toggles, feature flags |

---

## 12. Process Design — DFD and UML

### 12.1 Context Diagram (Level 0 DFD)

```
                                    ┌──────────────────┐
                                    │  Security Analyst │
                                    └────────┬─────────┘
                                             │
                 Queries, Filters, Configs   │   Dashboards, Alerts,
                                             │   Reports, Charts
                                             ▼
                    ┌────────────────────────────────────────────┐
                    │                                            │
                    │   Cloud & Big Data Analytics Platform      │
                    │   for User Behavior Analysis               │
                    │                                            │
                    └────────────────────────┬───────────────────┘
                                             │
                                             │  User Activity Logs
                                             │  Network Traffic Data
                                             ▼
                                    ┌──────────────────┐
                                    │  Enterprise       │
                                    │  Data Sources     │
                                    │  (Simulated)      │
                                    └──────────────────┘
```

### 12.2 Level 1 DFD

```
┌──────────┐     Request      ┌──────────────┐     Raw Data      ┌────────────────┐
│ Security │ ──────────────► │  1.0          │ ◄──────────────── │  D1: Synthetic │
│ Analyst  │                  │  Process      │                   │  Data Store    │
│          │ ◄────────────── │  User Request │ ──────────────►  │                │
└──────────┘   Dashboard/     └──────┬───────┘                   └────────────────┘
               Alerts/Reports        │
                                     │ Activity Data
                                     ▼
                              ┌──────────────┐
                              │  2.0          │    Anomaly        ┌────────────────┐
                              │  Analyze      │ ──────────────►  │  D2: Alerts    │
                              │  Behavior     │    Alerts          │  Store         │
                              └──────┬───────┘                   └────────────────┘
                                     │
                                     │ Risk Scores
                                     ▼
                              ┌──────────────┐
                              │  3.0          │    Charts/KPIs    ┌────────────────┐
                              │  Generate     │ ──────────────►  │  D3: Dashboard │
                              │  Visualizations│                  │  Cache         │
                              └──────────────┘                   └────────────────┘
```

### 12.3 Use Case Diagram (UML)

```
                          ┌─────────────────────────────────────────────────┐
                          │        CloudGuard Analytics Platform            │
                          │                                                 │
    ┌────────────┐        │   ┌─────────────────────┐                      │
    │            │────────┼──►│ View Dashboard KPIs  │                      │
    │            │        │   └─────────────────────┘                      │
    │            │        │   ┌─────────────────────┐                      │
    │            │────────┼──►│ Search / Filter Users│                      │
    │  Security  │        │   └─────────────────────┘                      │
    │  Analyst   │        │   ┌─────────────────────┐                      │
    │            │────────┼──►│ View User Profile    │                      │
    │            │        │   └─────────────────────┘                      │
    │            │        │   ┌─────────────────────┐                      │
    │            │────────┼──►│ Investigate Alerts   │                      │
    │            │        │   └─────────────────────┘                      │
    │            │        │   ┌─────────────────────┐                      │
    │            │────────┼──►│ Analyze Network      │                      │
    │            │        │   │ Traffic              │                      │
    │            │        │   └─────────────────────┘                      │
    │            │        │   ┌─────────────────────┐                      │
    │            │────────┼──►│ Download Reports     │                      │
    └────────────┘        │   └─────────────────────┘                      │
                          │                                                 │
    ┌────────────┐        │   ┌─────────────────────┐                      │
    │    IT      │────────┼──►│ Configure Settings   │                      │
    │   Admin    │        │   └─────────────────────┘                      │
    └────────────┘        │                                                 │
                          └─────────────────────────────────────────────────┘
```

### 12.4 Class Diagram (UML)

```
┌──────────────────────────┐      ┌──────────────────────────┐
│        User              │      │      ActivityLog          │
├──────────────────────────┤      ├──────────────────────────┤
│ - id: string             │      │ - id: string             │
│ - firstName: string      │      │ - userId: string         │
│ - lastName: string       │      │ - type: string           │
│ - email: string          │      │ - timestamp: Date        │
│ - department: string     │ 1  * │ - sourceIP: string       │
│ - role: string           │──────│ - destIP: string         │
│ - location: string       │      │ - resource: string       │
│ - riskScore: number      │      │ - bytesTransferred: num  │
│ - riskLevel: string      │      │ - status: string         │
│ - status: string         │      │ - isOffHours: boolean    │
│ - ipAddress: string      │      └──────────────────────────┘
│ - totalActivities: num   │
└──────────┬───────────────┘      ┌──────────────────────────┐
           │ 1  *                 │      NetworkTraffic       │
           │                      ├──────────────────────────┤
┌──────────┴───────────────┐      │ - id: string             │
│       Alert              │      │ - sourceIP: string       │
├──────────────────────────┤      │ - destIP: string         │
│ - id: string             │      │ - protocol: string       │
│ - userId: string         │      │ - bytesIn: number        │
│ - type: string           │      │ - bytesOut: number       │
│ - severity: string       │      │ - packets: number        │
│ - description: string    │      │ - status: string         │
│ - timestamp: Date        │      └──────────────────────────┘
│ - status: string         │
│ - confidenceScore: num   │      ┌──────────────────────────┐
│ - assignedTo: string     │      │       Report             │
└──────────────────────────┘      ├──────────────────────────┤
                                  │ - id: string             │
┌──────────────────────────┐      │ - name: string           │
│   AnomalyDetector        │      │ - frequency: string      │
├──────────────────────────┤      │ - lastGenerated: Date    │
│ + zScore(): number       │      │ - status: string         │
│ + mean(): number         │      │ - pages: number          │
│ + stdDev(): number       │      │ - format: string         │
│ + analyzeUser(): Analysis│      └──────────────────────────┘
└──────────────────────────┘
```

### 12.5 Sequence Diagram — Dashboard Load

```
┌─────────┐        ┌──────────┐        ┌───────────┐       ┌──────────────┐
│ Browser │        │   React  │        │  Express  │       │   Data       │
│         │        │  Router  │        │   API     │       │  Generator   │
└────┬────┘        └────┬─────┘        └─────┬─────┘       └──────┬───────┘
     │  Navigate /      │                    │                     │
     │──────────────────►│                    │                     │
     │                   │  Render Dashboard  │                     │
     │                   │  Component         │                     │
     │                   │                    │                     │
     │                   │  GET /api/dashboard│                     │
     │                   │───────────────────►│                     │
     │                   │                    │  generateDashboard()│
     │                   │                    │────────────────────►│
     │                   │                    │                     │
     │                   │                    │  { kpis, charts,    │
     │                   │                    │◄───── alerts }      │
     │                   │                    │                     │
     │                   │  JSON Response     │                     │
     │                   │◄───────────────────│                     │
     │                   │                    │                     │
     │  Render Charts,   │                    │                     │
     │  KPIs, Tables     │                    │                     │
     │◄──────────────────│                    │                     │
     │                   │                    │                     │
```

---

## 13. Database Design — ER Diagram

> **Note**: The current implementation uses in-memory synthetic data. The ER diagram below represents the logical data model that would map to a production database (e.g., MongoDB or PostgreSQL).

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     USERS       │       │  ACTIVITY_LOGS  │       │  NETWORK_TRAFFIC│
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ *id (PK)        │       │ *id (PK)        │       │ *id (PK)        │
│  firstName      │ 1   * │  userId (FK)    │       │  timestamp      │
│  lastName       │───────│  type           │       │  sourceIP       │
│  email          │       │  timestamp      │       │  destIP         │
│  department     │       │  sourceIP       │       │  sourcePort     │
│  role           │       │  destIP         │       │  destPort       │
│  location       │       │  resource       │       │  protocol       │
│  riskScore      │       │  bytesTransferd │       │  bytesIn        │
│  riskLevel      │       │  status         │       │  bytesOut       │
│  status         │       │  isOffHours     │       │  packets        │
│  ipAddress      │       │  location       │       │  duration       │
│  lastActive     │       └─────────────────┘       │  flags          │
│  joinDate       │                                 │  status         │
└────────┬────────┘                                 └─────────────────┘
         │
         │ 1   *
         │
┌────────┴────────┐       ┌─────────────────┐
│     ALERTS      │       │    REPORTS       │
├─────────────────┤       ├─────────────────┤
│ *id (PK)        │       │ *id (PK)        │
│  userId (FK)    │       │  name           │
│  type           │       │  frequency      │
│  severity       │       │  lastGenerated  │
│  description    │       │  status         │
│  timestamp      │       │  pages          │
│  sourceIP       │       │  size           │
│  status         │       │  format         │
│  assignedTo     │       └─────────────────┘
│  confidenceScore│
└─────────────────┘

Relationships:
  USERS (1) ────── (*) ACTIVITY_LOGS    [One user has many activity logs]
  USERS (1) ────── (*) ALERTS           [One user can have many alerts]
  NETWORK_TRAFFIC                       [Independent — tracked by IP, not user FK]
  REPORTS                               [Independent — system-generated]
```

---

## 14. Input Design Layout

The platform accepts user input through the following interfaces:

### 14.1 Search and Filter Inputs (Users Page)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🔍  Search users by name, email, or ID...                             │
├─────────────────────────────────────────────────────────────────────────┤
│  [All Departments ▼]  [All Risk Levels ▼]  [Risk: High → Low ▼]       │
└─────────────────────────────────────────────────────────────────────────┘
```

- **Search Box**: Free-text input filtering users by name, email, or user ID
- **Department Dropdown**: Filters by one of 10 departments
- **Risk Level Dropdown**: Filters by Critical / High / Medium / Low
- **Sort Dropdown**: Orders results by risk score or alphabetically

### 14.2 Alert Severity Filter (Alerts Page)

```
┌────────────────────────────────────────────────────┐
│  ( All )  ( Critical )  ( High )  ( Medium )  ( Low ) │
└────────────────────────────────────────────────────┘
```

- **Filter Chips**: Toggle-style buttons that filter the alert feed by severity level

### 14.3 Settings Form (Settings Page)

```
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│  Anomaly Detection Engine            │  │  Notification Preferences    │
│                                      │  │                              │
│  Risk Score Threshold    [ 70   ]    │  │  Email Alerts        [ON ]   │
│  Z-Score Threshold       [ 2.0  ]    │  │  Slack Integration   [OFF]   │
│  Off-Hours Start         [ 22   ]    │  │  Critical Only       [OFF]   │
│  Off-Hours End           [ 6    ]    │  │  Alert Email                 │
│  Max Failed Logins       [ 5    ]    │  │  [ security@enterprise.com ] │
│  Data Retention (days)   [ 90   ]    │  │                              │
└──────────────────────────────────────┘  └──────────────────────────────┘
```

- **Number Inputs**: Configure anomaly detection thresholds
- **Toggle Switches**: Enable/disable notification channels and platform features
- **Text Inputs**: Configure email addresses and organization name

---

## 15. Output Design Layout

### 15.1 Dashboard Output

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│  │ Total Users│ │Active Sess.│ │Alerts Today│ │Network Traf│  ... (8 KPIs) │
│  │    50      │ │    28      │ │     7      │ │  12.3 GB   │               │
│  │  ↑ 5.2%   │ │  ↑ 12.5%   │ │  ↓ 8.3%   │ │  ↑ 3.1%   │               │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘               │
│                                                                             │
│  ┌────────────────────────────────────────────┐ ┌─────────────────────────┐ │
│  │  Activity Timeline (24h)                    │ │  Alert Severity         │ │
│  │  ~~~~~~~~~~~~~~~~~~~~~~~~~~~                │ │      ╭─────╮           │ │
│  │  ~~~~~~~~  Area Chart  ~~~~~                │ │     ╱  PIE  ╲          │ │
│  │  ~~~~~~~~~~~~~~~~~~~~~~~~~~~                │ │    ╱  CHART  ╲         │ │
│  └────────────────────────────────────────────┘ └─────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Recent Anomaly Alerts                                                │  │
│  │  ID    │ User    │ Type                │ Severity │ Time    │ Status  │  │
│  │  ALT-1 │ J.Smith │ Brute Force Attempt │ CRITICAL │ 2:30 AM │ Open   │  │
│  │  ALT-2 │ R.Patel │ Off Hours Access    │ HIGH     │ 3:15 AM │ Invest.│  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 15.2 User Detail Output

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ◄ Back to Users                                                            │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  [JP]  James Patel                              ┌──────────┐       │   │
│  │        james.patel@enterprise.com                │ Risk: 82 │       │   │
│  │        Engineering — Manager                    │ CRITICAL  │       │   │
│  │        San Francisco • 10.172.45.12             └──────────┘       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────┐  ┌──────────────────────────────────────────┐ │
│  │  Activity Breakdown     │  │  Daily Activity (7 Days)                  │ │
│  │      (Pie Chart)        │  │      (Area Chart)                        │ │
│  └─────────────────────────┘  └──────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────┐  ┌──────────────────────────────────────────┐ │
│  │  Login Time Distribution│  │  User Alerts (3)                         │ │
│  │      (Bar Chart)        │  │  • Brute Force Attempt — CRITICAL        │ │
│  │  Red bars = off-hours   │  │  • Off Hours Access — HIGH               │ │
│  └─────────────────────────┘  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 15.3 Alert Detail Modal Output

```
┌───────────────────────────────────────────────────────────┐
│  Alert Detail — ALT-0012                           [ ✕ ]  │
├───────────────────────────────────────────────────────────┤
│  Type: Brute Force Attempt    Severity: ■ CRITICAL       │
│  User: Maria Novak            Status: ■ Open             │
│        Finance                                           │
│  Source IP: 10.215.33.97      Confidence: 94%            │
│  Timestamp: Mar 14, 2:30 AM   Assigned: SOC Team         │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 87 failed login attempts detected for Maria Novak   │ │
│  │ within 7 minutes                                    │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  [Mark as Investigating]  [Dismiss]      [Export Details] │
└───────────────────────────────────────────────────────────┘
```

---

## 16. Code with Screenshots

### 16.1 Project Structure

```
IntigratedProject/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── index.css                    (700+ lines — dark glassmorphism design system)
│   ├── App.jsx                      (React Router + layout)
│   ├── components/
│   │   ├── Sidebar.jsx              (Collapsible navigation)
│   │   ├── Topbar.jsx               (Search, notifications, user)
│   │   └── KpiCard.jsx              (Animated stat card)
│   └── pages/
│       ├── Dashboard.jsx            (KPIs, charts, alerts table)
│       ├── Users.jsx                (Filterable user table)
│       ├── UserDetail.jsx           (User behavior profile)
│       ├── Alerts.jsx               (Alert feed + detail modal)
│       ├── NetworkAnalytics.jsx     (Traffic + protocol charts)
│       ├── Reports.jsx              (Report cards grid)
│       └── Settings.jsx             (Config forms + toggles)
└── server/
    ├── package.json
    ├── index.js                     (Express server)
    ├── routes/api.js                (REST API endpoints)
    ├── data/generator.js            (Synthetic data engine)
    └── analytics/anomalyDetector.js (Z-score + rule-based engine)
```

### 16.2 Key Code Snippets

#### Anomaly Detection — Z-Score Analysis

```javascript
// server/analytics/anomalyDetector.js

function zScore(value, mean, stdDev) {
  if (stdDev === 0) return 0;
  return (value - mean) / stdDev;
}

function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function stdDev(arr) {
  const avg = mean(arr);
  return Math.sqrt(arr.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / arr.length);
}

export function analyzeUserBehavior(users, logs) {
  // Group logs by user
  const userLogs = {};
  logs.forEach(log => {
    if (!userLogs[log.userId]) userLogs[log.userId] = [];
    userLogs[log.userId].push(log);
  });

  // Calculate baseline metrics
  const activityCounts = Object.values(userLogs).map(ul => ul.length);
  const avgActivity = mean(activityCounts);
  const sdActivity = stdDev(activityCounts);

  users.forEach(user => {
    const uLogs = userLogs[user.id] || [];
    const activityZ = zScore(uLogs.length, avgActivity, sdActivity);

    // Flag if Z-score exceeds threshold
    if (activityZ > 2) {
      flags.push({ type: 'high_activity_volume', zScore: activityZ });
    }
  });
}
```

#### REST API — Dashboard Endpoint

```javascript
// server/routes/api.js

router.get('/dashboard', (req, res) => {
  const dashboard = generateDashboardData(users, logs, alerts, traffic);
  res.json(dashboard);
});

router.get('/users', (req, res) => {
  const { search, department, riskLevel, sort } = req.query;
  let filtered = [...users];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(u =>
      u.fullName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }
  if (department) filtered = filtered.filter(u => u.department === department);
  if (riskLevel) filtered = filtered.filter(u => u.riskLevel === riskLevel);
  res.json({ users: filtered, total: filtered.length });
});
```

#### Dashboard React Component (excerpt)

```jsx
// src/pages/Dashboard.jsx

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => setData(d));
  }, []);

  return (
    <div className="animate-in">
      <div className="kpi-grid">
        <KpiCard icon={Users} label="Total Users" value={kpis.totalUsers}
          trend={5.2} color="#6366f1" bgColor="rgba(99,102,241,0.12)" />
        <KpiCard icon={AlertTriangle} label="Alerts Today" value={kpis.alertsToday}
          trend={-8.3} color="#ef4444" bgColor="rgba(239,68,68,0.12)" />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={activityByHour}>
          <Area type="monotone" dataKey="activities" stroke="#6366f1" fill="url(#grad)" />
          <Area type="monotone" dataKey="anomalies" stroke="#ef4444" fill="url(#gradRed)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
```

#### CSS Design System (excerpt)

```css
/* src/index.css — Dark Glassmorphism Theme */

:root {
  --bg-primary: #0a0e1a;
  --bg-card: rgba(17, 24, 39, 0.7);
  --accent-primary: #6366f1;
  --color-critical: #ef4444;
  --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.15);
}

.glass-card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
  transition: all var(--transition-base);
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

> **Note**: Full source code is available in the project repository. The above are representative excerpts. See Section 16.1 for the complete file listing.
>
> **Screenshots**: Run the application using the instructions in the Walkthrough document and capture screenshots from each page for inclusion in the final printed report.

---

## 17. Testing and Implementation

### 17.1 Testing Strategy

| Test Type | Scope | Method |
|---|---|---|
| **Unit Testing** | Anomaly detection functions (Z-score, mean, stdDev) | Manual verification of mathematical outputs |
| **API Testing** | All 7 REST endpoints | cURL commands and browser DevTools |
| **Integration Testing** | Frontend ↔ Backend data flow | End-to-end navigation through all pages |
| **UI Testing** | Component rendering, interactions | Visual inspection in Chrome/Firefox |
| **Responsive Testing** | Layout at different screen sizes | Browser DevTools responsive mode |
| **Performance Testing** | API response times, page load speed | Chrome DevTools Performance tab |

### 17.2 Test Cases

| ID | Test Case | Input | Expected Output | Result |
|---|---|---|---|---|
| TC-01 | Dashboard loads with KPI data | Navigate to `/` | 8 KPIs displayed with values | ✅ Pass |
| TC-02 | Activity timeline chart renders | Navigate to `/` | Area chart with 24 data points | ✅ Pass |
| TC-03 | User search works | Type "James" in search | Filtered user list showing matching users | ✅ Pass |
| TC-04 | Department filter works | Select "Finance" | Only Finance department users shown | ✅ Pass |
| TC-05 | User detail page loads | Click a user row | Profile, charts, activity log displayed | ✅ Pass |
| TC-06 | Alert severity filter works | Click "Critical" chip | Only critical alerts shown | ✅ Pass |
| TC-07 | Alert detail modal opens | Click an alert item | Modal with full alert details | ✅ Pass |
| TC-08 | Network traffic chart renders | Navigate to `/network` | Stacked bar chart with inbound/outbound | ✅ Pass |
| TC-09 | Reports page shows report cards | Navigate to `/reports` | Grid of report cards with metadata | ✅ Pass |
| TC-10 | Settings toggles work | Toggle "Email Alerts" | Toggle switches between ON/OFF state | ✅ Pass |
| TC-11 | Sidebar collapse works | Click collapse button | Sidebar shrinks to icon-only mode | ✅ Pass |
| TC-12 | API returns valid JSON | `GET /api/dashboard` | JSON response with kpis, charts fields | ✅ Pass |
| TC-13 | 404 routes redirect to home | Navigate to `/invalid` | Redirected to Dashboard | ✅ Pass |
| TC-14 | Risk score colors are correct | View Users page | Red ≥75, Orange ≥50, Yellow ≥25, Green <25 | ✅ Pass |
| TC-15 | Off-hours login bars are red | View User Detail | Login distribution bars colored red for hours 0–5, 23 | ✅ Pass |

### 17.3 API Endpoint Test Results

```bash
# Dashboard endpoint
$ curl http://localhost:5000/api/dashboard
→ Status: 200 OK | Response time: < 50ms
→ Contains: kpis, activityByHour, activityByDay, alertsBySeverity, departmentRisk, recentAlerts

# Users endpoint with filters
$ curl "http://localhost:5000/api/users?department=Finance&sort=risk_desc"
→ Status: 200 OK | Response time: < 20ms
→ Contains: users (filtered), total count

# Alerts endpoint with severity filter
$ curl "http://localhost:5000/api/alerts?severity=critical"
→ Status: 200 OK | Response time: < 15ms
→ Contains: alerts (critical only), summary counts

# Network analytics endpoint
$ curl http://localhost:5000/api/analytics/network
→ Status: 200 OK | Response time: < 30ms
→ Contains: byProtocol, trafficOverTime, topSources
```

---

## 18. Implementation Steps

### Step 1: Environment Setup
```bash
# Verify Node.js installation
node --version     # v18.x or higher
npm --version      # v9.x or higher
```

### Step 2: Install Backend Dependencies
```bash
cd /home/aniket/Documents/IntigratedProject/server
npm install
```

### Step 3: Start Backend Server
```bash
node index.js
# Output: CloudGuard Analytics API Server running on http://localhost:5000
```

### Step 4: Install Frontend Dependencies
```bash
cd /home/aniket/Documents/IntigratedProject
npm install
```

### Step 5: Start Frontend Dev Server
```bash
npm run dev
# Output: Vite dev server running on http://localhost:5173
```

### Step 6: Access the Application
Open `http://localhost:5173` in a modern browser (Chrome, Firefox, or Edge).

### Step 7: Verify All Pages
Navigate through: Dashboard → Users → User Detail → Alerts → Network Analytics → Reports → Settings

---

## 19. Maintenance Steps

### 19.1 Regular Maintenance

| Activity | Frequency | Description |
|---|---|---|
| **Dependency Updates** | Monthly | Run `npm audit` and `npm update` for security patches |
| **Data Refresh** | As needed | Restart the server to regenerate synthetic data with fresh timestamps |
| **Browser Testing** | Quarterly | Verify compatibility with latest browser versions |
| **Code Linting** | Before each release | Ensure consistent code style and catch potential bugs |
| **Performance Audit** | Quarterly | Use Chrome Lighthouse to audit load times and accessibility |

### 19.2 Corrective Maintenance

- **Bug Fixes**: Address reported issues by modifying the specific module (component, API route, or data generator)
- **API Changes**: If data model changes, update both `generator.js` and the corresponding API route and frontend component
- **CSS Issues**: Use browser DevTools to identify and fix layout issues; test at multiple breakpoints

### 19.3 Adaptive Maintenance

- **Database Migration**: Replace in-memory data with MongoDB/PostgreSQL by modifying `server/routes/api.js` to query a database instead of calling generator functions
- **Authentication**: Add JWT-based authentication middleware to Express routes
- **Deployment**: Containerize with Docker and deploy to cloud platforms (AWS, GCP, Azure)

---

## 20. Future Scope and Conclusion

### 20.1 Future Scope

| Enhancement | Description | Complexity |
|---|---|---|
| **Real Database Integration** | Replace synthetic data with MongoDB or PostgreSQL for persistent data storage | Medium |
| **Machine Learning Anomaly Detection** | Implement Isolation Forest, LSTM, or Autoencoder models for advanced behavior prediction | High |
| **Real-Time Data Streaming** | Use WebSockets or Server-Sent Events for live activity feeds without page refresh | Medium |
| **User Authentication & RBAC** | Add JWT-based login with role-based access control (Admin, Analyst, Viewer) | Medium |
| **Email & Slack Alerting** | Implement actual notification delivery via SMTP and Slack webhooks | Low |
| **Log Ingestion Pipeline** | Add Apache Kafka or RabbitMQ for ingesting real syslog/network traffic data | High |
| **Geo-Location Map** | Integrate a world map visualization showing login locations and impossible travel paths | Medium |
| **Dark/Light Theme Toggle** | Allow users to switch between dark and light themes | Low |
| **Export & Download** | Enable PDF/CSV export of dashboards, user profiles, and alert reports | Medium |
| **Mobile Responsive** | Optimize layouts for mobile phone screens and create a PWA | Medium |
| **Docker Deployment** | Create Dockerfile and docker-compose for single-command deployment | Low |
| **Automated ML Pipeline** | Schedule periodic model retraining using Apache Airflow or cron jobs | High |

### 20.2 Conclusion

This project successfully demonstrates the design and implementation of a **Cloud and Big Data Analytics Platform for User Behavior Analysis in Enterprise Networks**. The platform addresses the critical need for accessible, cost-effective user behavior analytics in cybersecurity by integrating:

1. **Cloud Architecture Principles**: The client–server, API-driven design mirrors cloud-native application patterns with clear separation of concerns and horizontal scalability potential.

2. **Big Data Analytics Concepts**: The platform processes and visualizes large volumes of synthetic user activity data, applying statistical analysis (Z-score) and behavioral pattern recognition to derive actionable security insights.

3. **Cybersecurity Operations**: The anomaly detection engine, alert management system, and risk scoring provide security analysts with the tools needed to identify and investigate threats — from brute-force attacks to data exfiltration and insider threats.

The system was built using exclusively free and open-source technologies (React.js, Node.js, Express, Recharts), making it accessible for academic environments and small-to-medium enterprises. The modular architecture allows straightforward extension to production-grade capabilities, including database persistence, real-time streaming, machine learning models, and cloud deployment.

Through this integrated project, we have demonstrated that modern web technologies, combined with well-established statistical methods, can deliver a powerful and visually compelling security analytics platform without the high costs and complexity associated with commercial SIEM/UEBA solutions.

---

## 21. References

1. Chandola, V., Banerjee, A., & Kumar, V. (2009). *Anomaly detection: A survey*. ACM Computing Surveys, 41(3), 1–58.

2. Sapegin, A., Amirkhanyan, A., Gawron, M., Cheng, F., & Meinel, C. (2017). *Poisson-based anomaly detection for identifying malicious user behaviour*. Proceedings of the International Conference on Big Data Analytics and Knowledge Discovery.

3. Rashid, T., Agrafiotis, I., & Nurse, J. R. (2016). *A new take on detecting insider threats*. Proceedings of the International Workshop on Managing Insider Security Threats.

4. React Documentation. (2024). *React — A JavaScript Library for Building User Interfaces*. https://react.dev/

5. Node.js Foundation. (2024). *Node.js Documentation*. https://nodejs.org/docs/

6. Express.js. (2024). *Express — Fast, unopinionated, minimalist web framework for Node.js*. https://expressjs.com/

7. Recharts. (2024). *Recharts — A composable charting library built on React components*. https://recharts.org/

8. Vite. (2024). *Vite — Next Generation Frontend Tooling*. https://vitejs.dev/

9. Gartner. (2023). *Market Guide for User and Entity Behavior Analytics*. Gartner Research.

10. NIST. (2018). *Framework for Improving Critical Infrastructure Cybersecurity, Version 1.1*. National Institute of Standards and Technology.

11. OWASP. (2021). *OWASP Top 10 — The Ten Most Critical Web Application Security Risks*. https://owasp.org/Top10/

12. Bishop, M. (2005). *Introduction to Computer Security*. Addison-Wesley.

---

**— End of Report —**
