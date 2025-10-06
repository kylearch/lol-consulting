<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #21808d 0%, #2da6b2 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: 600;
            color: #555;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .field-value {
            background: white;
            padding: 12px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
        .description {
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #888;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">lol.consulting</p>
    </div>

    <div class="content">
        <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">{{ $data['name'] }}</div>
        </div>

        <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value">
                <a href="mailto:{{ $data['email'] }}" style="color: #21808d; text-decoration: none;">
                    {{ $data['email'] }}
                </a>
            </div>
        </div>

        @if(!empty($data['projectType']))
        <div class="field">
            <div class="field-label">Project Type</div>
            <div class="field-value">
                {{ ucfirst(str_replace('-', ' ', $data['projectType'])) }}
            </div>
        </div>
        @endif

        @if(!empty($data['budget']))
        <div class="field">
            <div class="field-label">Budget Range</div>
            <div class="field-value">
                {{ $data['budget'] }}
            </div>
        </div>
        @endif

        <div class="field">
            <div class="field-label">Project Description</div>
            <div class="field-value description">{{ $data['description'] }}</div>
        </div>
    </div>

    <div class="footer">
        <p>This message was sent from the lol.consulting contact form.</p>
        <p>Timestamp: {{ now()->format('F j, Y g:i A') }}</p>
    </div>
</body>
</html>
