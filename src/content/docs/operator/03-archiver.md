---
title: Run an Archiver
description: This section outlines how to install a Dusk Archiver Node.
---
Archivers differs from [Provisioners](/operator/02-provisioner) by preserving a complete historical record of the Dusk blockchain. While Provisioners are focused solely on the current state, Archivers provide essential long-term data access that supports applications, users, researchers, and auditors who need comprehensive historical information.

Archivers play a unique role in the Dusk Network by focusing on data storage and accessibility, rather than participating in consensus. This means they are not required to stake DUSK, as they serve an entirely supportive function for dApps and services that rely on historical records. 

In short, Archivers:
- Provide historical data.
- Do not participate in consensus, and therefore they are not required to stake DUSK.


### Archiver Specifications

Since Archivers focus on storing and serving historical data, they benefit from high storage capacity, efficient processing for concurrent requests, and fast internet connectivity. The recommended specifications below serve as a baseline for Archivers. Higher configurations will improve their capacity to manage multiple data requests simultaneously.


| CPU | RAM | Storage | Network Connection |
| :--- | :--- | :--- | :--- |
| 8 cores; 2 GHz | 16 GB | 250 GB | 100 Mbps |
