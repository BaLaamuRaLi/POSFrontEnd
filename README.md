# POS Desktop Application — Frontend UI

---
![status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
React front-end for point of sales app built with electron
  <p >
  <img src="https://img.shields.io/badge/v19.2.0-React-violet" alt="React" />
  <img src="https://img.shields.io/badge/v7.3.1-Vite-violet" alt="Vite" />
  <img src="https://img.shields.io/badge/v6-MaterialUI-violet" alt="MUI" />
</p>
## Stack<br/>
* [React](https://react.dev) - The library for web and native user interfaces.<br/>
* [vite](https://vite.dev/) - Ultra-fast front-end build tool and dev server<br/>
* [MaterialUI](https://mui.com/material-ui/) - Component library powering the checkout interface.<br/>

## Preview

![[Pasted image 20260619122924.png]]
 ![[Pasted image 20260619122621.png]]


 ![[Pasted image 20260619121607.png]]
## Architecture 
* **Decoupled Monorepo/Structure:** Separated the React UI from the Electron core to enable web-based simulation, isolating state management from hardware-level processes. 
* **IPC Communication:** Implemented a secure preload script context bridge to safely pass transaction payloads between the React UI layer and the native Node.js environment.

## Core Features Built 
* **Secure Access:** Built a dedicated username-password authentication page.
* **Product Discovery:** Implemented an optimised client-side search engine for inventory lookup. 
* **User Management:** Designed structural interfaces for staff accounts and permission levels. 
* **Catalog Organization:** Engineered modular views for handling products and dynamic categories. 
* **State Navigation:** Configured seamless client-side page routing optimized for low-latency transitions.

## Installation 
1. Clone the repository: `git clone <repo-url>` 
2. Install dependencies: `npm install` 
3. Run web-simulation dev server: `npm run dev`

 



