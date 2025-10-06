import plotly.express as px
import plotly.graph_objects as go
import pandas as pd

# Create the data
data = [
    {"solution": "Google Drive/Dropbox", "complexity": 1, "target_user": 1, "category": "current", "description": "Basic file storage"},
    {"solution": "Canva", "complexity": 2.5, "target_user": 1, "category": "current", "description": "Design templates"},
    {"solution": "Notion Templates", "complexity": 3, "target_user": 1.5, "category": "current", "description": "Content organization"},
    {"solution": "Brandfolder/Bynder", "complexity": 4.5, "target_user": 4, "category": "current", "description": "Enterprise DAM"},
    {"solution": "Adobe Creative Cloud", "complexity": 4.8, "target_user": 4.2, "category": "current", "description": "Professional creative suite"},
    {"solution": "Frontify", "complexity": 4, "target_user": 3.5, "category": "current", "description": "Brand guidelines platform"},
    {"solution": "BrandForge (Proposed)", "complexity": 3.2, "target_user": 1.2, "category": "proposed", "description": "Progressive brand content management"}
]

df = pd.DataFrame(data)

# Create the scatter plot
fig = go.Figure()

# Add current solutions
current_data = df[df['category'] == 'current']
fig.add_trace(go.Scatter(
    x=current_data['complexity'],
    y=current_data['target_user'],
    mode='markers+text',
    marker=dict(size=12, color='#1FB8CD'),
    text=current_data['solution'],
    textposition='top center',
    hovertemplate='<b>%{text}</b><br>Complexity: %{x}<br>Target User: %{y}<extra></extra>',
    name='Current Solutions'
))

# Add proposed solution
proposed_data = df[df['category'] == 'proposed']
fig.add_trace(go.Scatter(
    x=proposed_data['complexity'],
    y=proposed_data['target_user'],
    mode='markers+text',
    marker=dict(size=15, color='#DB4545', symbol='star'),
    text=proposed_data['solution'],
    textposition='top center',
    hovertemplate='<b>%{text}</b><br>Complexity: %{x}<br>Target User: %{y}<extra></extra>',
    name='Proposed Solution'
))

# Update layout with title and subtitle
fig.update_layout(
    title={
        'text': 'Brand Management Solutions Market Positioning<br><sub>Identifying the Gap for Solo Founder-Focused Solutions</sub>',
        'x': 0.5,
        'xanchor': 'center'
    },
    xaxis_title='Complexity',
    yaxis_title='Target User',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Update axes to show the range clearly with better labels
fig.update_xaxes(range=[0.5, 5.5], tickvals=[1, 2, 3, 4, 5], ticktext=['Simple', 'Simple-Med', 'Medium', 'Med-Complex', 'Complex'])
fig.update_yaxes(range=[0.5, 4.5], tickvals=[1, 2, 3, 4], ticktext=['Solo Founders/<br>Small Teams', 'Small Teams', 'Mid-size Teams', 'Enterprise<br>Teams'])

# Apply cliponaxis=False for scatterplots as instructed
fig.update_traces(cliponaxis=False)

# Save as both PNG and SVG
fig.write_image("brand_positioning_chart.png")
fig.write_image("brand_positioning_chart.svg", format="svg")

fig.show()