"use client";
import { useState } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Loader2, AlertCircle } from "lucide-react";
import "../styles/infrapredict.css";

// Define API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://infra-pred.vercel.app/api";

// Type definitions
interface MapLayerData {
  vulnerabilityScore?: number;
  durabilityScore?: number;
  riskScore?: number;
  primaryVulnerabilities?: string[];
  primaryRisks?: string[];
  estimatedLifespan?: string;
  materialCondition?: string;
  mitigationOpportunities?: string[];
  criticalInfrastructure?: string[];
  detailedAnalysis: string;
}

interface MaintenancePlan {
  maintenanceSchedule: {
    immediate?: string[];
    shortTerm?: string[];
    longTerm?: string[];
    quarterly?: string[];
    biannual?: string[];
    annual?: string[];
  };
  costEstimates: {
    immediate?: string;
    shortTerm?: string;
    longTerm?: string;
    quarterly?: string;
    biannual?: string;
    annual?: string;
  };
  resourceRequirements: string[];
  expectedOutcomes: string[];
  recommendations: string;
  riskMitigation?: string;
  comparisonToPredictive?: string;
}

interface ProjectPlan {
  projectOverview: string;
  phases: {
    name: string;
    duration: string;
    tasks: string[];
    milestones: string[];
    resources: string[];
  }[];
  budgetBreakdown: {
    materials: string;
    labor: string;
    equipment: string;
    overhead: string;
    contingency: string;
  };
  riskAssessment: {
    risk: string;
    probability: string;
    impact: string;
    mitigation: string;
  }[];
  expectedOutcomes: string[];
  recommendations: string;
}

interface FundingOpportunities {
  governmentGrants: {
    name: string;
    agency: string;
    amount: string;
    deadline: string;
    eligibility: string;
    description: string;
  }[];
  privateFunding: {
    name: string;
    organization: string;
    amount: string;
    focus: string;
    eligibility: string;
    description: string;
  }[];
  publicPrivatePartnerships: {
    name: string;
    partners: string[];
    structure: string;
    benefits: string[];
    description: string;
  }[];
  applicationTips: string;
  recommendedFunding: string;
}

interface ResilienceResources {
  summary: string;
  bestPractices: string[];
  caseStudies: {
    title: string;
    location: string;
    scenario: string;
    solution: string;
    outcomes: string;
  }[];
  technicalGuidance: string[];
  implementationSteps: string[];
  materialRecommendations: string[];
  costEffectiveStrategies: string;
}

export default function InfrastructureResiliencePage() {
  // State variables
  const [selectedMapLayer, setSelectedMapLayer] = useState("vulnerability");
  const [maintenanceScenario, setMaintenanceScenario] = useState("predictive");
  const [location, setLocation] = useState("");
  const [projectType, setProjectType] = useState("bridge");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("12 months");
  const [hazardType, setHazardType] = useState("flood");
  
  // State for data from API
  const [mapData, setMapData] = useState<MapLayerData | null>(null);
  const [maintenancePlan, setMaintenancePlan] = useState<MaintenancePlan | null>(null);
  const [projectPlan, setProjectPlan] = useState<ProjectPlan | null>(null);
  const [fundingOpportunities, setFundingOpportunities] = useState<FundingOpportunities | null>(null);
  const [resilienceResources, setResilienceResources] = useState<ResilienceResources | null>(null);
  
  // Loading and error states
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [isMaintenanceLoading, setIsMaintenanceLoading] = useState(false);
  const [isProjectPlanLoading, setIsProjectPlanLoading] = useState(false);
  const [isFundingLoading, setIsFundingLoading] = useState(false);
  const [isResourcesLoading, setIsResourcesLoading] = useState(false);
  
  const [mapError, setMapError] = useState("");
  const [maintenanceError, setMaintenanceError] = useState("");
  const [projectPlanError, setProjectPlanError] = useState("");
  const [fundingError, setFundingError] = useState("");
  const [resourcesError, setResourcesError] = useState("");

  const mapLayers = [
    { id: "vulnerability", name: "Infrastructure Vulnerability" },
    { id: "durability", name: "Durability Scores" },
    { id: "risk", name: "Risk Assessment" },
  ];

  const maintenanceScenarios = [
    { id: "predictive", name: "Predictive Maintenance" },
    { id: "scheduled", name: "Scheduled Maintenance" },
  ];

  const projectTypes = [
    { id: "bridge", name: "Bridge Construction/Repair" },
    { id: "road", name: "Road Infrastructure" },
    { id: "water", name: "Water Management" },
    { id: "energy", name: "Energy Infrastructure" },
    { id: "building", name: "Building Reinforcement" },
  ];

  const hazardTypes = [
    { id: "flood", name: "Flood Resilience" },
    { id: "storm", name: "Storm Resistance" },
    { id: "earthquake", name: "Earthquake Protection" },
    { id: "fire", name: "Fire Mitigation" },
    { id: "drought", name: "Drought Management" },
  ];

  const handleLayerChange = (layer: string) => {
    setSelectedMapLayer(layer);
    if (location) {
      fetchMapAnalysis(location, layer);
    }
  };

  const handleMaintenanceScenarioChange = (scenario: string) => {
    setMaintenanceScenario(scenario);
    if (location) {
      fetchMaintenancePlan(location, scenario);
    }
  };

  // API fetch functions
  const fetchMapAnalysis = async (locationValue: string, layer: string) => {
    setIsMapLoading(true);
    setMapError("");
    setMapData(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/map/analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: locationValue, layer }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch map analysis');
      }
      
      const data = await response.json();
      setMapData(data);
    } catch (error) {
      console.error('Error fetching map analysis:', error);
      setMapError('Failed to fetch analysis. Please try again.');
    } finally {
      setIsMapLoading(false);
    }
  };

  const fetchMaintenancePlan = async (locationValue: string, scenario: string) => {
    setIsMaintenanceLoading(true);
    setMaintenanceError("");
    setMaintenancePlan(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/maintenance/plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: locationValue, scenario }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch maintenance plan');
      }
      
      const data = await response.json();
      setMaintenancePlan(data);
    } catch (error) {
      console.error('Error fetching maintenance plan:', error);
      setMaintenanceError('Failed to fetch maintenance plan. Please try again.');
    } finally {
      setIsMaintenanceLoading(false);
    }
  };

  const fetchProjectPlan = async () => {
    if (!location || !projectType) {
      setProjectPlanError('Location and project type are required');
      return;
    }
    
    setIsProjectPlanLoading(true);
    setProjectPlanError("");
    setProjectPlan(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/project/plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, projectType, budget, timeline }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch project plan');
      }
      
      const data = await response.json();
      setProjectPlan(data);
    } catch (error) {
      console.error('Error fetching project plan:', error);
      setProjectPlanError('Failed to generate project plan. Please try again.');
    } finally {
      setIsProjectPlanLoading(false);
    }
  };

  const fetchFundingOpportunities = async () => {
    if (!location || !projectType) {
      setFundingError('Location and project type are required');
      return;
    }
    
    setIsFundingLoading(true);
    setFundingError("");
    setFundingOpportunities(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/funding/opportunities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, projectType, budget }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch funding opportunities');
      }
      
      const data = await response.json();
      setFundingOpportunities(data);
    } catch (error) {
      console.error('Error fetching funding opportunities:', error);
      setFundingError('Failed to fetch funding opportunities. Please try again.');
    } finally {
      setIsFundingLoading(false);
    }
  };

  const fetchResilienceResources = async () => {
    if (!location || !hazardType) {
      setResourcesError('Location and hazard type are required');
      return;
    }
    
    setIsResourcesLoading(true);
    setResourcesError("");
    setResilienceResources(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/resilience/resources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, hazardType }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch resilience resources');
      }
      
      const data = await response.json();
      setResilienceResources(data);
    } catch (error) {
      console.error('Error fetching resilience resources:', error);
      setResourcesError('Failed to fetch resilience resources. Please try again.');
    } finally {
      setIsResourcesLoading(false);
    }
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      fetchMapAnalysis(location, selectedMapLayer);
      fetchMaintenancePlan(location, maintenanceScenario);
    }
  };

  // Render map data based on layer type
  const renderMapData = () => {
    if (!mapData) return null;
    
    let scoreValue = 0;
    let scoreLabel = "";
    let primaryItems: string[] = [];
    let secondaryItems: string[] = [];
    
    if (selectedMapLayer === "vulnerability") {
      scoreValue = mapData.vulnerabilityScore || 0;
      scoreLabel = "Vulnerability Score";
      primaryItems = mapData.primaryVulnerabilities || [];
      secondaryItems = mapData.criticalInfrastructure || [];
    } else if (selectedMapLayer === "durability") {
      scoreValue = mapData.durabilityScore || 0;
      scoreLabel = "Durability Score";
      primaryItems = [mapData.estimatedLifespan || "Unknown"];
      secondaryItems = [mapData.materialCondition || "Unknown"];
    } else if (selectedMapLayer === "risk") {
      scoreValue = mapData.riskScore || 0;
      scoreLabel = "Risk Score";
      primaryItems = mapData.primaryRisks || [];
      secondaryItems = mapData.mitigationOpportunities || [];
    }
    
    return (
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-bold mb-2">{scoreLabel}: {scoreValue}/10</h3>
        <p className="text-gray-600 mb-4">Analysis for {location}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">{selectedMapLayer === "vulnerability" ? "Primary Vulnerabilities" : 
                                              selectedMapLayer === "durability" ? "Estimated Lifespan" : 
                                              "Primary Risks"}</h4>
            <ul className="list-disc pl-5">
              {primaryItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">{selectedMapLayer === "vulnerability" ? "Critical Infrastructure at Risk" : 
                                              selectedMapLayer === "durability" ? "Material Condition" : 
                                              "Mitigation Opportunities"}</h4>
            <ul className="list-disc pl-5">
              {secondaryItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Detailed Analysis</h4>
            <p className="text-gray-700">{mapData.detailedAnalysis}</p>
          </div>
        </div>
      </div>
    );
  };

  // Render maintenance plan data
  const renderMaintenancePlan = () => {
    if (!maintenancePlan) return null;
    
    const scheduleData = maintenanceScenario === "predictive" 
      ? [
          { label: "Immediate Tasks", tasks: maintenancePlan.maintenanceSchedule.immediate, cost: maintenancePlan.costEstimates.immediate },
          { label: "Short-Term Tasks", tasks: maintenancePlan.maintenanceSchedule.shortTerm, cost: maintenancePlan.costEstimates.shortTerm },
          { label: "Long-Term Tasks", tasks: maintenancePlan.maintenanceSchedule.longTerm, cost: maintenancePlan.costEstimates.longTerm }
        ]
      : [
          { label: "Quarterly Tasks", tasks: maintenancePlan.maintenanceSchedule.quarterly, cost: maintenancePlan.costEstimates.quarterly },
          { label: "Biannual Tasks", tasks: maintenancePlan.maintenanceSchedule.biannual, cost: maintenancePlan.costEstimates.biannual },
          { label: "Annual Tasks", tasks: maintenancePlan.maintenanceSchedule.annual, cost: maintenancePlan.costEstimates.annual }
        ];
    
    return (
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-bold mb-2">{maintenanceScenario === "predictive" ? "Predictive Maintenance Plan" : "Scheduled Maintenance Plan"}</h3>
        <p className="text-gray-600 mb-4">Maintenance plan for {location}</p>
        
        <div className="space-y-6">
          <Tabs defaultValue={scheduleData[0].label.toLowerCase().replace(" ", "-")}>
            <TabsList className="grid grid-cols-3">
              {scheduleData.map((item, index) => (
                <TabsTrigger key={index} value={item.label.toLowerCase().replace(" ", "-")}>{item.label}</TabsTrigger>
              ))}
            </TabsList>
            
            {scheduleData.map((item, index) => (
              <TabsContent key={index} value={item.label.toLowerCase().replace(" ", "-")}>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{item.label} - Est. Cost: {item.cost}</h4>
                  <ul className="list-disc pl-5">
                    {item.tasks?.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div>
            <h4 className="font-semibold mb-2">Resource Requirements</h4>
            <ul className="list-disc pl-5">
              {maintenancePlan.resourceRequirements.map((resource, index) => (
                <li key={index}>{resource}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Expected Outcomes</h4>
            <ul className="list-disc pl-5">
              {maintenancePlan.expectedOutcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Recommendations</h4>
            <p className="text-gray-700">{maintenancePlan.recommendations}</p>
          </div>
          
          {maintenanceScenario === "predictive" && maintenancePlan.riskMitigation && (
            <div>
              <h4 className="font-semibold mb-2">Risk Mitigation</h4>
              <p className="text-gray-700">{maintenancePlan.riskMitigation}</p>
            </div>
          )}
          
          {maintenanceScenario === "scheduled" && maintenancePlan.comparisonToPredictive && (
            <div>
              <h4 className="font-semibold mb-2">Comparison to Predictive Maintenance</h4>
              <p className="text-gray-700">{maintenancePlan.comparisonToPredictive}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="text-gray-900 font-sans">
      <Head>
        <title>Infrastructure Resilience</title>
        <meta name="description" content="Infrastructure resilience planning and assessment tool" />
      </Head>
      

      {/* Hero Section */}
      <section className="relative h-screen hero-section bg-gradient-to-b from-blue-900 to-green-600 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Infrastructure Resilience</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Strengthen critical infrastructure and plan for climate resilience with our predictive tools.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Interactive Infrastructure Vulnerability Map */}
      <section id="map" className="py-16 bg-gray-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Infrastructure Vulnerability Analyser</h2>
          
          {/* Location Search Form */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <form onSubmit={handleLocationSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="Enter city, state, or region"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Analyze Infrastructure</Button>
            </form>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Type of Analysis</h3>
              <ul className="space-y-4">
                {mapLayers.map((layer) => (
                  <li
                    key={layer.id}
                    onClick={() => handleLayerChange(layer.id)}
                    className={`p-4 cursor-pointer rounded-lg transition transform hover:scale-105 ${
                      selectedMapLayer === layer.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                    }`}
                  >
                    {layer.name}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="w-full md:w-2/3">
              {mapError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{mapError}</AlertDescription>
                </Alert>
              )}

              {isMapLoading ? (
                <div className="bg-white p-8 rounded-lg shadow-md flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-blue-600">Loading analysis...</span>
                </div>
              ) : mapData ? (
                renderMapData()
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">{selectedMapLayer} View</h3>
                  <p className="text-gray-700">
                    Enter a location above to view {selectedMapLayer.toLowerCase()} data.
                  </p>
                  <div className="mt-6 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Interactive map visualization will be displayed here.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Risk-Based Maintenance Planner */}
      <section id="maintenance" className="py-16 bg-gray-100 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Risk-Based Maintenance Planner</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Maintenance Scenarios</h3>
              <ul className="space-y-4">
                {maintenanceScenarios.map((scenario) => (
                  <li
                    key={scenario.id}
                    onClick={() => handleMaintenanceScenarioChange(scenario.id)}
                    className={`p-4 cursor-pointer rounded-lg transition transform hover:scale-105 ${
                      maintenanceScenario === scenario.id
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-green-100"
                    }`}
                  >
                    {scenario.name}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="w-full md:w-2/3">
              {maintenanceError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{maintenanceError}</AlertDescription>
                </Alert>
              )}

              {isMaintenanceLoading ? (
                <div className="bg-white p-8 rounded-lg shadow-md flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                  <span className="ml-2 text-green-600">Loading maintenance plan...</span>
                </div>
              ) : maintenancePlan ? (
                renderMaintenancePlan()
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-green-600">Selected Scenario</h3>
                  <p className="text-gray-700">
                    {location ? `Please wait while we generate a ${maintenanceScenario} maintenance plan for ${location}.` : 
                     "Enter a location above to generate a maintenance plan."}
                  </p>
                  <div className="mt-6 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Visualization for {maintenanceScenario} will appear here.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

        {/* Project Planning Tool */}
  <section id="project-planning" className="py-16 bg-gray-200 transition-all duration-300">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Project Planning Tool</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={(e) => { e.preventDefault(); fetchProjectPlan(); }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="project-type">Project Type</Label>
              <Select 
                value={projectType} 
                onValueChange={setProjectType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Estimated Budget</Label>
              <Input 
                id="budget" 
                placeholder="e.g. $500,000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeline">Project Timeline</Label>
              <Select 
                value={timeline} 
                onValueChange={setTimeline}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6 months">6 months</SelectItem>
                  <SelectItem value="12 months">12 months</SelectItem>
                  <SelectItem value="18 months">18 months</SelectItem>
                  <SelectItem value="24 months">24 months</SelectItem>
                  <SelectItem value="36+ months">36+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Generate Project Plan</Button>
        </form>
      </div>
      
      {projectPlanError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{projectPlanError}</AlertDescription>
        </Alert>
      )}

      {isProjectPlanLoading ? (
        <div className="bg-white p-8 rounded-lg shadow-md flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-blue-600">Generating project plan...</span>
        </div>
      ) : projectPlan ? (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold mb-2">Project Plan for {location}</h3>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Project Overview</h4>
            <p className="text-gray-700">{projectPlan.projectOverview}</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Project Phases</h4>
              <Tabs defaultValue={projectPlan.phases[0]?.name.toLowerCase().replace(" ", "-") || "phase-1"}>
                <TabsList className="grid grid-cols-3">
                  {projectPlan.phases.map((phase, index) => (
                    <TabsTrigger key={index} value={phase.name.toLowerCase().replace(" ", "-")}>{phase.name}</TabsTrigger>
                  ))}
                </TabsList>
                
                {projectPlan.phases.map((phase, index) => (
                  <TabsContent key={index} value={phase.name.toLowerCase().replace(" ", "-")}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{phase.name}</CardTitle>
                        <CardDescription>Duration: {phase.duration}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium">Tasks</h5>
                            <ul className="list-disc pl-5">
                              {phase.tasks.map((task, taskIndex) => (
                                <li key={taskIndex}>{task}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium">Milestones</h5>
                            <ul className="list-disc pl-5">
                              {phase.milestones.map((milestone, milestoneIndex) => (
                                <li key={milestoneIndex}>{milestone}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium">Resources</h5>
                            <ul className="list-disc pl-5">
                              {phase.resources.map((resource, resourceIndex) => (
                                <li key={resourceIndex}>{resource}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Budget Breakdown</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Materials</div>
                  <div className="text-lg font-semibold">{projectPlan.budgetBreakdown.materials}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Labor</div>
                  <div className="text-lg font-semibold">{projectPlan.budgetBreakdown.labor}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Equipment</div>
                  <div className="text-lg font-semibold">{projectPlan.budgetBreakdown.equipment}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Overhead</div>
                  <div className="text-lg font-semibold">{projectPlan.budgetBreakdown.overhead}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Contingency</div>
                  <div className="text-lg font-semibold">{projectPlan.budgetBreakdown.contingency}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Risk Assessment</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Risk</th>
                      <th className="text-left p-2">Probability</th>
                      <th className="text-left p-2">Impact</th>
                      <th className="text-left p-2">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectPlan.riskAssessment.map((risk, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white/50" : ""}>
                        <td className="p-2">{risk.risk}</td>
                        <td className="p-2">{risk.probability}</td>
                        <td className="p-2">{risk.impact}</td>
                        <td className="p-2">{risk.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Expected Outcomes</h4>
              <ul className="list-disc pl-5">
                {projectPlan.expectedOutcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Recommendations</h4>
              <p className="text-gray-700">{projectPlan.recommendations}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <p className="text-gray-700 mb-4">
            Plan, budget, and track progress on infrastructure reinforcement projects with ease.
          </p>
          <div className="space-y-4">
            <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center transition-transform">
              <p className="text-gray-500">Enter location and project details above to generate a comprehensive project plan.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  </section>

  {/* Funding Opportunities Directory */}
  <section id="funding" className="py-16 bg-white transition-all duration-300">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Funding Opportunities Directory</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={(e) => { e.preventDefault(); fetchFundingOpportunities(); }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="project-type-funding">Project Type</Label>
              <Select 
                value={projectType} 
                onValueChange={setProjectType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget-funding">Estimated Budget</Label>
              <Input 
                id="budget-funding" 
                placeholder="e.g. $500,000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700">Find Funding Opportunities</Button>
        </form>
      </div>
      
      {fundingError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{fundingError}</AlertDescription>
        </Alert>
      )}

      {isFundingLoading ? (
        <div className="bg-white p-8 rounded-lg shadow-md flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-600" />
          <span className="ml-2 text-yellow-600">Searching funding opportunities...</span>
        </div>
      ) : fundingOpportunities ? (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold mb-4">Funding Opportunities for {projectType} in {location}</h3>
          
          <Tabs defaultValue="government-grants">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="government-grants">Government Grants</TabsTrigger>
              <TabsTrigger value="private-funding">Private Funding</TabsTrigger>
              <TabsTrigger value="partnerships">Public-Private Partnerships</TabsTrigger>
            </TabsList>
            
            <TabsContent value="government-grants">
              <div className="space-y-4 mt-4">
                {fundingOpportunities.governmentGrants.map((grant, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{grant.name}</CardTitle>
                      <CardDescription>{grant.agency} - Up to {grant.amount}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-2">{grant.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h5 className="font-semibold text-sm text-gray-500">Deadline</h5>
                          <p>{grant.deadline}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm text-gray-500">Eligibility</h5>
                          <p>{grant.eligibility}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-100">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="private-funding">
              <div className="space-y-4 mt-4">
                {fundingOpportunities.privateFunding.map((fund, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{fund.name}</CardTitle>
                      <CardDescription>{fund.organization} - Up to {fund.amount}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-2">{fund.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h5 className="font-semibold text-sm text-gray-500">Focus</h5>
                          <p>{fund.focus}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm text-gray-500">Eligibility</h5>
                          <p>{fund.eligibility}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-100">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="partnerships">
              <div className="space-y-4 mt-4">
                {fundingOpportunities.publicPrivatePartnerships.map((partnership, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{partnership.name}</CardTitle>
                      <CardDescription>Partnership Structure: {partnership.structure}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-2">{partnership.description}</p>
                      <div className="mt-4">
                        <h5 className="font-semibold text-sm text-gray-500">Partners</h5>
                        <ul className="list-disc pl-5">
                          {partnership.partners.map((partner, partnerIndex) => (
                            <li key={partnerIndex}>{partner}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-semibold text-sm text-gray-500">Benefits</h5>
                        <ul className="list-disc pl-5">
                          {partnership.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-100">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold mb-2">Application Tips</h4>
            <p className="text-gray-700">{fundingOpportunities.applicationTips}</p>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold mb-2">Recommended Funding Approach</h4>
            <p className="text-gray-700">{fundingOpportunities.recommendedFunding}</p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <p className="text-gray-700 mb-4">
            Find grants and funding sources available for climate resilience projects.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 text-yellow-600 border-yellow-600 hover:bg-yellow-100">
                Government Grants
              </Button>
              <Button variant="outline" className="flex-1 text-yellow-600 border-yellow-600 hover:bg-yellow-100">
                Private Funding
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  </section>

  {/* Resilience Strengthening Resources */}
  <section id="resources" className="py-16 bg-gray-50 transition-all duration-300">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Resilience Strengthening Resources</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={(e) => { e.preventDefault(); fetchResilienceResources(); }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hazard-type">Hazard Type</Label>
              <Select 
                value={hazardType} 
                onValueChange={setHazardType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hazard type" />
                </SelectTrigger>
                <SelectContent>
                  {hazardTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">Find Resources</Button>
        </form>
      </div>
      
      {resourcesError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{resourcesError}</AlertDescription>
        </Alert>
      )}

      {isResourcesLoading ? (
        <div className="bg-white p-8 rounded-lg shadow-md flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <span className="ml-2 text-green-600">Fetching resilience resources...</span>
        </div>
      ) : resilienceResources ? (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold mb-4">{hazardType.charAt(0).toUpperCase() + hazardType.slice(1)} Resilience Resources</h3>
          
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Summary</h4>
            <p className="text-gray-700">{resilienceResources.summary}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Best Practices</h4>
              <ul className="list-disc pl-5">
                {resilienceResources.bestPractices.map((practice, index) => (
                  <li key={index} className="mb-2">{practice}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Implementation Steps</h4>
              <ol className="list-decimal pl-5">
                {resilienceResources.implementationSteps.map((step, index) => (
                  <li key={index} className="mb-2">{step}</li>
                ))}
              </ol>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Case Studies</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resilienceResources.caseStudies.map((study, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{study.title}</CardTitle>
                    <CardDescription>{study.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sm text-gray-500">Scenario</h5>
                        <p>{study.scenario}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-gray-500">Solution</h5>
                        <p>{study.solution}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-gray-500">Outcomes</h5>
                        <p>{study.outcomes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Technical Guidance</h4>
              <ul className="list-disc pl-5">
                {resilienceResources.technicalGuidance.map((guidance, index) => (
                  <li key={index} className="mb-2">{guidance}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Material Recommendations</h4>
              <ul className="list-disc pl-5">
                {resilienceResources.materialRecommendations.map((material, index) => (
                  <li key={index} className="mb-2">{material}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold mb-2">Cost-Effective Strategies</h4>
            <p className="text-gray-700">{resilienceResources.costEffectiveStrategies}</p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <p className="text-gray-700 mb-4">
            Explore tutorials and guidelines on strengthening key infrastructure against climate events.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 text-green-600 border-green-600 hover:bg-green-100">
                Flood Resilience Guide
              </Button>
              <Button variant="outline" className="flex-1 text-green-600 border-green-600 hover:bg-green-100">
                Storm Resistance Guide
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  </section>


  {/* Footer */}

  <Footer />
  </div>)}
