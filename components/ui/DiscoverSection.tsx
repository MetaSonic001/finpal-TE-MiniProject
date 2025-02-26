import { motion } from "framer-motion";
import { Rocket, Lightbulb, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AccordionTrigger, AccordionContent, Accordion, AccordionItem } from "@/components/ui/accordion";

const topics = [
  {
    icon: Rocket,
    title: "Startup Strategy",
    description: "From ideation to execution roadmap",
    details: [
      "Market Research & Validation",
      "Business Model Canvas",
      "MVP Development Strategy",
      "Go-to-Market Planning"
    ]
  },
  {
    icon: Lightbulb,
    title: "Tech & Innovation",
    description: "Cutting-edge technology implementation",
    details: [
      "AI Integration Possibilities",
      "Blockchain Use Cases",
      "Product Development Best Practices",
      "Tech Stack Selection"
    ]
  },
  {
    icon: Target,
    title: "Growth & Investment",
    description: "Funding strategies & VC pitching",
    details: [
      "Pitch Deck Creation",
      "Valuation Fundamentals",
      "Investment Terms",
      "Growth Metrics That Matter"
    ]
  }
];

export function DiscoverSection() {
  return (
    <section className="py-24 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What You Will Discover
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Comprehensive learning tracks designed to transform your startup journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/50 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <topic.icon className="w-8 h-8 text-[#CCFF00]" />
                    <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
                  </div>
                  <p className="text-zinc-400 mb-6">{topic.description}</p>
                  
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details">
                      <AccordionTrigger className="text-white hover:text-[#CCFF00]">
                        View Details
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-zinc-400">
                          {topic.details.map((detail, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DiscoverSection;