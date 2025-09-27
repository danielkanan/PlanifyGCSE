"use client";

import { PageTransition, StaggerContainer, StaggerItem } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <StaggerContainer className="space-y-8">
            <StaggerItem>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                  Terms of Service
                </h1>
                <p className="text-muted-foreground text-lg">
                  Last updated: September 27, 2025
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Agreement to Our Legal Terms</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We are PlanifyGCSE (<strong>Company</strong>, <strong>we</strong>, <strong>us</strong>, or <strong>our</strong>).
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We operate the website <a href="https://planifygcse.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://planifygcse.com</a> (the <strong>Site</strong>), as well as any other related products and services that refer or link to these legal terms (the <strong>Legal Terms</strong>) (collectively, the <strong>Services</strong>).
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You can contact us by email at <a href="mailto:support@planifygcse.com" className="text-blue-600 hover:underline">support@planifygcse.com</a>.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (<strong>you</strong>), and PlanifyGCSE, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. <strong>IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong>
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The Services are intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you using the Services.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We recommend that you print a copy of these Legal Terms for your records.
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <a href="#services" className="text-blue-600 hover:underline">1. Our Services</a>
                    <a href="#ip" className="text-blue-600 hover:underline">2. Intellectual Property Rights</a>
                    <a href="#userreps" className="text-blue-600 hover:underline">3. User Representations</a>
                    <a href="#userreg" className="text-blue-600 hover:underline">4. User Registration</a>
                    <a href="#prohibited" className="text-blue-600 hover:underline">5. Prohibited Activities</a>
                    <a href="#ugc" className="text-blue-600 hover:underline">6. User Generated Contributions</a>
                    <a href="#license" className="text-blue-600 hover:underline">7. Contribution Licence</a>
                    <a href="#thirdparty" className="text-blue-600 hover:underline">8. Third-Party Websites and Content</a>
                    <a href="#sitemanage" className="text-blue-600 hover:underline">9. Services Management</a>
                    <a href="#ppyes" className="text-blue-600 hover:underline">10. Privacy Policy</a>
                    <a href="#terms" className="text-blue-600 hover:underline">11. Term and Termination</a>
                    <a href="#modifications" className="text-blue-600 hover:underline">12. Modifications and Interruptions</a>
                    <a href="#law" className="text-blue-600 hover:underline">13. Governing Law</a>
                    <a href="#disputes" className="text-blue-600 hover:underline">14. Dispute Resolution</a>
                    <a href="#corrections" className="text-blue-600 hover:underline">15. Corrections</a>
                    <a href="#disclaimer" className="text-blue-600 hover:underline">16. Disclaimer</a>
                    <a href="#liability" className="text-blue-600 hover:underline">17. Limitations of Liability</a>
                    <a href="#indemnification" className="text-blue-600 hover:underline">18. Indemnification</a>
                    <a href="#userdata" className="text-blue-600 hover:underline">19. User Data</a>
                    <a href="#electronic" className="text-blue-600 hover:underline">20. Electronic Communications</a>
                    <a href="#misc" className="text-blue-600 hover:underline">21. Miscellaneous</a>
                    <a href="#contact" className="text-blue-600 hover:underline">22. Contact Us</a>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle id="services" className="text-xl font-semibold">1. Our Services</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle id="ip" className="text-xl font-semibold">2. Intellectual Property Rights</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Our intellectual property</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the <strong>Content</strong>), as well as the trademarks, service marks, and logos contained therein (the <strong>Marks</strong>).
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties around the world.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      The Content and Marks are provided in or through the Services <strong>AS IS</strong> for your personal, non-commercial use or internal business purpose only.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Your use of our Services</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Subject to your compliance with these Legal Terms, including the <a href="#prohibited" className="text-blue-600 hover:underline">PROHIBITED ACTIVITIES</a> section below, we grant you a non-exclusive, non-transferable, revocable licence to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>access the Services; and</li>
                      <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      solely for your personal, non-commercial use or internal business purpose.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Your submissions</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong>Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services (<strong>Submissions</strong>), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle id="userreps" className="text-xl font-semibold">3. User Representations</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    By using the Services, you represent and warrant that:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                    <li>all registration information you submit will be true, accurate, current, and complete;</li>
                    <li>you will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
                    <li>you have the legal capacity and you agree to comply with these Legal Terms;</li>
                    <li>you are not under the age of 13;</li>
                    <li>you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services;</li>
                    <li>you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
                    <li>you will not use the Services for any illegal or unauthorised purpose; and</li>
                    <li>your use of the Services will not violate any applicable law or regulation.</li>
                  </ol>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle id="userreg" className="text-xl font-semibold">4. User Registration</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle id="prohibited" className="text-xl font-semibold">5. Prohibited Activities</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavours except those that are specifically endorsed or approved by us.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    As a user of the Services, you agree not to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                    <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                    <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                    <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
                    <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                    <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                    <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                    <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                    <li>Engage in unauthorised framing of or linking to the Services.</li>
                    <li>Upload or transmit viruses, Trojan horses, or other material that interferes with any party's uninterrupted use and enjoyment of the Services.</li>
                    <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                    <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                    <li>Attempt to impersonate another user or person or use the username of another user.</li>
                    <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavour or commercial enterprise.</li>
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle id="ppyes" className="text-xl font-semibold">10. Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    We care about data privacy and security. Please review our Privacy Policy: <a href="https://planifygcse.com/privacy-policy" className="text-blue-600 hover:underline font-semibold" target="_blank" rel="noopener noreferrer">https://planifygcse.com/privacy-policy</a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United Kingdom. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United Kingdom, then through your continued use of the Services, you are transferring your data to the United Kingdom, and you expressly consent to have your data transferred to and processed in the United Kingdom.
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle id="terms" className="text-xl font-semibold">11. Term and Termination</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle id="disclaimer" className="text-xl font-semibold">16. Disclaimer</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES.
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle id="contact" className="text-xl font-semibold">22. Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
                  </p>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Email:</strong> <a href="mailto:support@planifygcse.com" className="text-blue-600 hover:underline">support@planifygcse.com</a>
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );
}
