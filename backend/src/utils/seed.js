const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const env = require('../config/env');
const Admin = require('../models/Admin');
const Page = require('../models/Page');

const seedData = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('Connected to database for seeding...');

    // Clear existing data
    await Admin.deleteMany({});
    await Page.deleteMany({});

    // Create Admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await Admin.create({
      name: 'RenewCred Administrator',
      email: 'admin@renewcred.com',
      password: hashedPassword
    });
    console.log(`Created admin user: ${admin.email}`);

    // Initial Default Pages / Sections
    const initialPages = [
      {
        title: 'Hero Section',
        slug: 'hero',
        content: {
          heading: 'Accelerating Climate Action',
          subHeading: 'Measure, Verify and Earn Carbon Credits with transparent, high-integrity digital monitoring.',
          buttonText: 'Explore Carbon Credits'
        },
        blocks: [
          {
            type: 'heading',
            data: { text: 'Accelerating Climate Action' },
            order: 1
          },
          {
            type: 'paragraph',
            data: { text: 'Measure, Verify and Earn Carbon Credits with transparent, high-integrity digital monitoring.' },
            order: 2
          }
        ]
      },
      {
        title: 'About Us',
        slug: 'about',
        content: {
          title: 'Who We Are',
          description: 'RenewCred is an advanced climate fintech platform connecting eco-innovators with global carbon credit marketplaces. We provide end-to-end telemetry and verification for renewable energy and biochar projects.'
        },
        blocks: [
          {
            type: 'heading',
            data: { text: 'Who We Are' },
            order: 1
          },
          {
            type: 'markdown',
            data: {
              markdown: `### Empowering Sustainable Futures

RenewCred leverages blockchain and IoT sensors to track carbon offset projects in real time.

#### Core Capabilities
- Real-time IoT Data Capture
- Automated MRV (Measurement, Reporting, Verification)
- Direct Marketplace Integration

| Metric | Target | Status |
|---|---|---|
| Carbon Offsets | 100K+ Tonnes | Active |
| Verified Projects | 45+ Sites | Live |`
            },
            order: 2
          }
        ]
      },
      {
        title: 'Services',
        slug: 'services',
        content: [
          {
            id: '1',
            title: 'Carbon Credit Issuance',
            description: 'Convert verified greenhouse gas reductions into standardized, tradeable digital carbon tokens.'
          },
          {
            id: '2',
            title: 'Automated MRV telemetry',
            description: 'Deploy IoT nodes to stream real-time environmental metrics directly into smart contracts.'
          },
          {
            id: '3',
            title: 'Marketplace Integration',
            description: 'Direct access to institutional buyers looking for high-quality certified carbon removal projects.'
          }
        ],
        blocks: []
      },
      {
        title: 'Climate Projects',
        slug: 'projects',
        content: [
          {
            id: 'p1',
            name: 'Biochar Agritech Facility',
            category: 'Agriculture',
            description: 'Converts agricultural waste into stable biochar, permanently sequestering carbon in soil.',
            status: 'Active',
            location: 'Punjab, India'
          },
          {
            id: 'p2',
            name: 'Solar Microgrid Grid',
            category: 'Renewables',
            description: 'Provides clean solar electricity to 25 rural villages replacing diesel generators.',
            status: 'Expanding',
            location: 'Rajasthan, India'
          },
          {
            id: 'p3',
            name: 'Mangrove Coastal Restoration',
            category: 'Blue Carbon',
            description: 'Restores coastal ecosystems to sequester blue carbon and protect local marine ecosystems.',
            status: 'Active',
            location: 'Kerala, India'
          }
        ],
        blocks: [
          {
            type: 'equation',
            data: {
              latex: 'CO_2 + H_2O \\rightarrow C_6H_{12}O_6 + O_2'
            },
            order: 1
          }
        ]
      },
      {
        title: 'Frequently Asked Questions',
        slug: 'faq',
        content: [
          {
            id: 'f1',
            question: 'What is a Carbon Credit?',
            answer: 'A carbon credit is a verified permit or certificate representing the reduction or removal of one metric tonne of carbon dioxide (CO2) or equivalent greenhouse gas from the atmosphere.'
          },
          {
            id: 'f2',
            question: 'How does RenewCred verify emissions reductions?',
            answer: 'RenewCred uses continuous satellite imagery and IoT sensors combined with third-party audited registries to verify carbon offset integrity.'
          },
          {
            id: 'f3',
            question: 'Who can trade on RenewCred?',
            answer: 'Both project developers seeking funding and corporate buyers looking to offset their Scope 1, 2, and 3 emissions.'
          }
        ],
        blocks: []
      },
      {
        title: 'Footer',
        slug: 'footer',
        content: {
          companyName: 'RenewCred Technologies Inc.',
          email: 'contact@renewcred.com',
          phone: '+1 (800) 555-RENEW',
          copyright: '© 2026 RenewCred Technologies Inc. All rights reserved.'
        },
        blocks: []
      }
    ];

    await Page.insertMany(initialPages);
    console.log(`Seeded ${initialPages.length} website sections successfully!`);

    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedData();
