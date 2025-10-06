# Create a progressive brand content development flowchart
diagram_code = """
flowchart LR
    %% Stage 1: Brand Foundation Setup
    A1["Brand Foundation<br/>Week 1"] --> A2["Add Brand Name"]
    A1 --> A3["Upload Logo/Icon"]
    A1 --> A4["Write Tagline"]
    A1 --> A5["Add Description"]
    A2 --> A6["Basic Brand Kit<br/>Visual Assets<br/>Core Messaging"]
    A3 --> A6
    A4 --> A6
    A5 --> A6
    
    %% Stage 2: Content Library Building
    A6 --> B1["Content Library<br/>Month 1"]
    B1 --> B2["Generate Tagline<br/>Variations"]
    B1 --> B3["Create Marketing<br/>Descriptions"]
    B1 --> B4["Build Social<br/>Media Content"]
    B1 --> B5["Develop Email<br/>Templates"]
    B2 --> B6["10+ Content<br/>Variations<br/>Platform Copy<br/>Reusable Templates"]
    B3 --> B6
    B4 --> B6
    B5 --> B6
    
    %% Stage 3: Template Creation
    B6 --> C1["Template Creation<br/>Month 3"]
    C1 --> C2["Save Successful<br/>Content Templates"]
    C1 --> C3["Create Content<br/>Categories"]
    C1 --> C4["Build Approval<br/>Workflows"]
    C1 --> C5["Set Brand Voice<br/>Guidelines"]
    C2 --> C6["Custom Templates<br/>Brand Guidelines<br/>Workflow<br/>Automation"]
    C3 --> C6
    C4 --> C6
    C5 --> C6
    
    %% Stage 4: Advanced Automation
    C6 --> D1["Advanced<br/>Automation<br/>Month 6+"]
    D1 --> D2["AI-Powered<br/>Content Gen"]
    D1 --> D3["Multi-Platform<br/>Distribution"]
    D1 --> D4["Analytics &<br/>Performance"]
    D1 --> D5["Team<br/>Collaboration"]
    D2 --> D6["Automated Content<br/>Creation<br/>Performance<br/>Insights<br/>Scalable<br/>Workflows"]
    D3 --> D6
    D4 --> D6
    D5 --> D6
    
    %% Styling
    classDef stage1 fill:#E8F4FD,stroke:#1FB8CD,stroke-width:2px,color:#000
    classDef stage2 fill:#D1ECF1,stroke:#2E8B57,stroke-width:2px,color:#000
    classDef stage3 fill:#B8D4DA,stroke:#5D878F,stroke-width:2px,color:#000
    classDef stage4 fill:#9FC3CA,stroke:#DB4545,stroke-width:2px,color:#000
    
    class A1,A2,A3,A4,A5,A6 stage1
    class B1,B2,B3,B4,B5,B6 stage2
    class C1,C2,C3,C4,C5,C6 stage3
    class D1,D2,D3,D4,D5,D6 stage4
"""

# Create the mermaid diagram
png_path, svg_path = create_mermaid_diagram(
    diagram_code, 
    'brand_workflow.png', 
    'brand_workflow.svg',
    width=1400,
    height=1000
)

print(f"Flowchart saved as: {png_path} and {svg_path}")