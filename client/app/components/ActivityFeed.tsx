interface ActivityItem {
  title: string;
  description: string;
  timestamp: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

interface ActivityFeedProps {
  title?: string;
  activities: ActivityItem[];
  showTitle?: boolean;
}

export default function ActivityFeed({ 
  title = 'Recent Activity', 
  activities, 
  showTitle = true 
}: ActivityFeedProps) {
  const getBorderColor = (type?: string) => {
    switch(type) {
      case 'success': return 'border-green-500';
      case 'warning': return 'border-yellow-500';
      case 'error': return 'border-red-500';
      default: return 'border-blue-500';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {showTitle && <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>}
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className={`border-l-4 ${getBorderColor(activity.type)} pl-4 py-2`}
          >
            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
            <p className="text-sm text-gray-600">{activity.description} • {activity.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}